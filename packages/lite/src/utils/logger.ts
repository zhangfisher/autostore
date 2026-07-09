export type ILogger = {
    debug: (message: string, ...args: any[]) => void;
    info: (message: string, ...args: any[]) => void;
    warn: (message: string, ...args: any[]) => void;
    error: (message: string, ...args: any[]) => void;
};

type Token = string | { placeholder: true };

function tokenizeMessage(message: string): Token[] {
    const tokens: Token[] = [];
    let lastIndex = 0;
    const regex = /\{\}/g;
    let match;

    while ((match = regex.exec(message)) !== null) {
        // 添加占位符前的文本
        if (match.index > lastIndex) {
            tokens.push(message.slice(lastIndex, match.index));
        }
        // 添加占位符标记
        tokens.push({ placeholder: true });
        lastIndex = match.index + match[0].length;
    }

    // 添加剩余文本
    if (lastIndex < message.length) {
        tokens.push(message.slice(lastIndex));
    }

    return tokens;
}

export function createLogger(options: { debug: boolean }): ILogger {
    function createLog(level: keyof ILogger, output: (...args: any[]) => void) {
        return (message: string | Error, ...args: any[]) => {
            if (!options.debug) {
                if (["debug", "info"].includes(level)) {
                    return;
                }
            }

            // Error 类型处理
            if (message instanceof Error) {
                output(`[${level.toUpperCase()}] ${message.message}`, ...args);
                return;
            }

            // 函数参数调用（函数返回数组时展开）
            const processedArgs: any[] = [];
            for (const arg of args) {
                if (typeof arg === "function") {
                    const result = arg();
                    if (Array.isArray(result)) {
                        processedArgs.push(...result);
                    } else {
                        processedArgs.push(result);
                    }
                } else {
                    processedArgs.push(arg);
                }
            }

            // Token 化消息
            const tokens = tokenizeMessage(message);

            // 构建输出数组
            const outputArgs: any[] = [`[${level.toUpperCase()}]`];
            let argIndex = 0;

            for (const token of tokens) {
                if (typeof token === "object" && token.placeholder) {
                    // 位置占位符 {}
                    if (argIndex < processedArgs.length) {
                        const value = processedArgs[argIndex++];
                        // 只跳过 null、undefined、空字符串
                        if (value === null || value === undefined || value === "") {
                            continue;
                        }
                        outputArgs.push(value);
                    }
                } else {
                    // 普通文本
                    if (token) {
                        outputArgs.push(token);
                    }
                }
            }

            // 剩余参数
            while (argIndex < processedArgs.length) {
                outputArgs.push(processedArgs[argIndex++]);
            }

            output(...outputArgs);
        };
    }
    return {
        debug: createLog("debug", console.debug),
        info: createLog("info", console.info),
        warn: createLog("warn", console.warn),
        error: createLog("error", console.error),
    };
}
