/**
 * Vite 插件：文件上传 API 处理
 * 提供 /api/upload 接口处理文件上传
 */

import type { Plugin } from 'vite';
import { createWriteStream, existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { join, extname } from 'path';
import { randomBytes } from 'crypto';

// 上传目录
const UPLOAD_DIR = join(__dirname, 'uploads');

// 确保上传目录存在
async function ensureUploadDir() {
    if (!existsSync(UPLOAD_DIR)) {
        await mkdir(UPLOAD_DIR, { recursive: true });
    }
}

// 解析 multipart/form-data
async function parseMultipartFormData(req: any): Promise<{ files: any[]; fields: Record<string, string> }> {
    return new Promise((resolve, reject) => {
        const contentType = req.headers['content-type'] || '';
        const boundaryMatch = contentType.match(/boundary=(.+)/);
        
        if (!boundaryMatch) {
            reject(new Error('Invalid content-type'));
            return;
        }

        const boundary = boundaryMatch[1];
        const chunks: Buffer[] = [];
        
        req.on('data', (chunk: Buffer) => {
            chunks.push(chunk);
        });

        req.on('end', () => {
            const buffer = Buffer.concat(chunks);
            const files: any[] = [];
            const fields: Record<string, string> = {};
            
            // 简单解析 multipart/form-data
            const boundaryBuffer = Buffer.from(`--${boundary}`);
            let start = 0;
            
            while (start < buffer.length) {
                const boundaryIndex = buffer.indexOf(boundaryBuffer, start);
                if (boundaryIndex === -1) break;
                
                const nextBoundaryIndex = buffer.indexOf(boundaryBuffer, boundaryIndex + boundaryBuffer.length);
                if (nextBoundaryIndex === -1) break;
                
                const part = buffer.slice(boundaryIndex + boundaryBuffer.length, nextBoundaryIndex);
                const headerEnd = part.indexOf('\r\n\r\n');
                
                if (headerEnd !== -1) {
                    const header = part.slice(0, headerEnd).toString();
                    const content = part.slice(headerEnd + 4);
                    
                    // 移除尾部的 \r\n
                    const finalContent = content.slice(0, content.length - 2);
                    
                    // 解析 Content-Disposition
                    const nameMatch = header.match(/name="([^"]+)"/);
                    const filenameMatch = header.match(/filename="([^"]+)"/);
                    
                    if (nameMatch) {
                        const name = nameMatch[1];
                        
                        if (filenameMatch) {
                            // 这是一个文件
                            const filename = filenameMatch[1];
                            const contentTypeMatch = header.match(/Content-Type:\s*(.+)/i);
                            const mimeType = contentTypeMatch ? contentTypeMatch[1].trim() : 'application/octet-stream';
                            
                            files.push({
                                fieldName: name,
                                filename,
                                mimeType,
                                data: finalContent,
                            });
                        } else {
                            // 这是一个普通字段
                            fields[name] = finalContent.toString();
                        }
                    }
                }
                
                start = nextBoundaryIndex;
            }
            
            resolve({ files, fields });
        });

        req.on('error', reject);
    });
}

// 生成唯一文件名
function generateFilename(originalName: string): string {
    const ext = extname(originalName);
    const random = randomBytes(16).toString('hex');
    return `${Date.now()}-${random}${ext}`;
}

// 文件上传 API 插件
export function uploadApiPlugin(): Plugin {
    return {
        name: 'upload-api',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                // 处理文件上传请求
                if (req.method === 'POST' && req.url === '/api/upload') {
                    try {
                        await ensureUploadDir();
                        
                        const { files, fields } = await parseMultipartFormData(req);
                        
                        if (files.length === 0) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ error: '没有上传文件' }));
                            return;
                        }

                        const uploadedFiles = [];
                        
                        for (const file of files) {
                            // 生成唯一文件名
                            const newFilename = generateFilename(file.filename);
                            const filePath = join(UPLOAD_DIR, newFilename);
                            
                            // 写入文件
                            const writeStream = createWriteStream(filePath);
                            await new Promise<void>((resolve, reject) => {
                                writeStream.write(file.data, (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                });
                            });
                            await new Promise<void>((resolve, reject) => {
                                writeStream.end((err) => {
                                    if (err) reject(err);
                                    else resolve();
                                });
                            });
                            
                            uploadedFiles.push({
                                url: `/uploads/${newFilename}`,
                                originalName: file.filename,
                                mimeType: file.mimeType,
                                size: file.data.length,
                            });
                        }

                        // 返回结果
                        const response = uploadedFiles.length === 1 
                            ? uploadedFiles[0] 
                            : uploadedFiles;
                        
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(response));
                        
                    } catch (error: any) {
                        console.error('Upload error:', error);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: error.message || '上传失败' }));
                    }
                    return;
                }

                // 处理静态文件请求（uploads 目录）
                if (req.url?.startsWith('/uploads/')) {
                    const filePath = join(UPLOAD_DIR, req.url.slice('/uploads/'.length));
                    try {
                        const { readFileSync, statSync } = await import('fs');
                        const stat = statSync(filePath);
                        
                        // 简单的 MIME 类型映射
                        const ext = extname(filePath).toLowerCase();
                        const mimeTypes: Record<string, string> = {
                            '.jpg': 'image/jpeg',
                            '.jpeg': 'image/jpeg',
                            '.png': 'image/png',
                            '.gif': 'image/gif',
                            '.webp': 'image/webp',
                            '.svg': 'image/svg+xml',
                            '.pdf': 'application/pdf',
                            '.txt': 'text/plain',
                            '.doc': 'application/msword',
                            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                        };
                        
                        const contentType = mimeTypes[ext] || 'application/octet-stream';
                        const content = readFileSync(filePath);
                        
                        res.writeHead(200, { 
                            'Content-Type': contentType,
                            'Content-Length': stat.size 
                        });
                        res.end(content);
                    } catch {
                        res.writeHead(404);
                        res.end('File not found');
                    }
                    return;
                }

                next();
            });
        },
    };
}
