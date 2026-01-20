export function expr<T = any>(code: string): T {
    return `\`\`\`${code}\`\`\`` as T;
}
