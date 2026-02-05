/**
 * apply-publish-config.ts
 *
 * 用于在发布前后处理 package.json 中的 publishConfig
 * - apply: 将 publishConfig 的内容合并到根级别,删除 publishConfig
 * - restore: 从 .bak 备份恢复原始 package.json
 */

import { readdirSync, existsSync, unlinkSync } from 'node:fs';
import { readFileSync } from 'node:fs';

interface PackageJson {
  publishConfig?: Record<string, unknown>;
  [key: string]: unknown;
}

interface WorkspaceConfig {
  workspaces?: string[];
}

/**
 * 标准化路径（处理 Windows 路径分隔符）
 */
function normalizePath(path: string): string {
  return path.replace(/\\/g, '/');
}

/**
 * 读取 JSON 文件（使用 Node.js API）
 */
function readJsonSync<T>(path: string): T | null {
  try {
    const text = readFileSync(path, 'utf-8');
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/**
 * 读取 JSON 文件（异步，使用 Bun API）
 */
async function readJson<T>(path: string): Promise<T | null> {
  try {
    const normalizedPath = normalizePath(path);
    const file = Bun.file(normalizedPath);
    const text = await file.text();
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
}

/**
 * 写入 JSON 文件
 */
function writeJson(path: string, data: unknown): boolean {
  try {
    Bun.write(normalizePath(path), JSON.stringify(data, null, '\t') + '\n');
    return true;
  } catch {
    return false;
  }
}

/**
 * 检查文件是否存在（使用 Node.js API）
 */
function fileExists(path: string): boolean {
  return existsSync(path);
}

/**
 * 查找工作区中所有包含 publishConfig 的包
 */
async function findPackagesWithPublishConfig(
  workspaceDir: string
): Promise<string[]> {
  const rootPackagePath = `${workspaceDir}/package.json`;

  const rootPackage = await readJson<WorkspaceConfig>(rootPackagePath);
  if (!rootPackage) {
    console.error('❌ 未找到根 package.json');
    return [];
  }

  if (!rootPackage.workspaces) {
    console.error('❌ 根 package.json 中未找到 workspaces 配置');
    return [];
  }

  const packageDirs: string[] = [];

  // 遍历 workspaces 配置
  for (const pattern of rootPackage.workspaces) {
    // 处理通配符模式 (如 packages/*)
    if (pattern.includes('*')) {
      const baseDir = normalizePath(workspaceDir + '/' + pattern.replace(/\*/g, ''));

      if (!fileExists(baseDir)) {
        continue;
      }

      const entries = readdirSync(baseDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const pkgPath = `${baseDir}/${entry.name}/package.json`;
          if (fileExists(pkgPath)) {
            packageDirs.push(pkgPath.replace(/\/package\.json$/, ''));
          }
        }
      }
    } else {
      // 处理具体目录
      const pkgJsonPath = normalizePath(`${workspaceDir}/${pattern}/package.json`);
      if (fileExists(pkgJsonPath)) {
        const dir = pkgJsonPath.replace(/\/package\.json$/, '');
        packageDirs.push(dir);
      }
    }
  }

  // 过滤出包含 publishConfig 的包
  const packagesWithConfig: string[] = [];
  for (const dir of packageDirs) {
    const pkg = await readJson<PackageJson>(`${dir}/package.json`);
    if (pkg?.publishConfig) {
      packagesWithConfig.push(dir);
    }
  }

  return packagesWithConfig;
}

/**
 * 查找工作区中所有包含 .bak 备份文件的包（用于恢复）
 */
async function findPackagesWithBackup(workspaceDir: string): Promise<string[]> {
  const rootPackagePath = `${workspaceDir}/package.json`;

  const rootPackage = await readJson<WorkspaceConfig>(rootPackagePath);
  if (!rootPackage) {
    console.error('❌ 未找到根 package.json');
    return [];
  }

  if (!rootPackage.workspaces) {
    console.error('❌ 根 package.json 中未找到 workspaces 配置');
    return [];
  }

  const packageDirs: string[] = [];

  // 遍历 workspaces 配置
  for (const pattern of rootPackage.workspaces) {
    // 处理通配符模式 (如 packages/*)
    if (pattern.includes('*')) {
      const baseDir = normalizePath(workspaceDir + '/' + pattern.replace(/\*/g, ''));

      if (!fileExists(baseDir)) {
        continue;
      }

      const entries = readdirSync(baseDir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const pkgPath = `${baseDir}/${entry.name}/package.json`;
          const bakPath = pkgPath + '.bak';
          if (fileExists(bakPath)) {
            packageDirs.push(pkgPath.replace(/\/package\.json$/, ''));
          }
        }
      }
    } else {
      // 处理具体目录
      const pkgJsonPath = normalizePath(`${workspaceDir}/${pattern}/package.json`);
      const bakPath = pkgJsonPath + '.bak';
      if (fileExists(bakPath)) {
        const dir = pkgJsonPath.replace(/\/package\.json$/, '');
        packageDirs.push(dir);
      }
    }
  }

  return packageDirs;
}

/**
 * 应用 publishConfig 配置
 */
async function applyConfig(packageDir: string): Promise<boolean> {
  const pkgPath = normalizePath(`${packageDir}/package.json`);
  const bakPath = pkgPath + '.bak';

  try {
    const pkg = await readJson<PackageJson>(pkgPath);
    if (!pkg?.publishConfig) {
      return false;
    }

    // 备份原始文件
    const originalContent = await Bun.file(pkgPath).text();
    Bun.write(bakPath, originalContent);

    // 将 publishConfig 合并到根级别
    const { publishConfig, ...rest } = pkg;
    const merged = { ...rest, ...publishConfig };

    // 写入修改后的 package.json
    writeJson(pkgPath, merged);

    console.log(`✅ 已应用配置: ${packageDir}`);
    return true;
  } catch (error) {
    console.error(`❌ 应用配置失败: ${packageDir}`, error);
    return false;
  }
}

/**
 * 恢复原始配置
 */
async function restoreConfig(packageDir: string): Promise<boolean> {
  const pkgPath = normalizePath(`${packageDir}/package.json`);
  const bakPath = pkgPath + '.bak';

  if (!fileExists(bakPath)) {
    // 没有备份文件,跳过
    return false;
  }

  try {
    // 从备份恢复
    const backupContent = await Bun.file(bakPath).text();
    Bun.write(pkgPath, backupContent);

    // 删除备份文件（使用 Node.js API）
    unlinkSync(bakPath);

    console.log(`✅ 已恢复配置: ${packageDir}`);
    return true;
  } catch (error) {
    console.error(`❌ 恢复配置失败: ${packageDir}`, error);
    return false;
  }
}

/**
 * 主函数
 */
async function main(action: 'apply' | 'restore') {
  // 获取项目根目录（脚本在 scripts/ 目录下，需要返回上一级）
  const workspaceDir = `${import.meta.dir}/..`;

  let packages: string[];
  let message: string;

  if (action === 'apply') {
    console.log(`\n🔍 查找包含 publishConfig 的包...`);
    packages = await findPackagesWithPublishConfig(workspaceDir);
    message = '包含 publishConfig 的包';
  } else {
    console.log(`\n🔍 查找包含备份文件的包...`);
    packages = await findPackagesWithBackup(workspaceDir);
    message = '包含备份文件的包';
  }

  if (packages.length === 0) {
    console.log('ℹ️  未找到需要处理的包');
    return;
  }

  console.log(`📦 找到 ${packages.length} 个${message}\n`);

  let processed = 0;

  if (action === 'apply') {
    console.log('📝 应用 publishConfig...\n');
    for (const pkgDir of packages) {
      if (await applyConfig(pkgDir)) {
        processed++;
      }
    }
  } else {
    console.log('🔄 恢复原始配置...\n');
    for (const pkgDir of packages) {
      if (await restoreConfig(pkgDir)) {
        processed++;
      }
    }
  }

  console.log(`\n✨ 完成！处理了 ${processed} 个包`);
}

// 解析命令行参数
const args = process.argv.slice(2);
const action = args[0];

if (action === 'apply' || action === 'restore') {
  main(action);
} else {
  console.error('用法: bun run apply-config [apply|restore]');
  console.error('  apply  - 应用 publishConfig 配置');
  console.error('  restore - 恢复原始配置');
  process.exit(1);
}
