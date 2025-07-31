export function parseFunc(fnStr: string): Function | undefined {
    // 去掉可选的 ``` 包裹
    if (fnStr.startsWith('```') && fnStr.endsWith('```')) {
        fnStr = fnStr.slice(3, -3);
    }

    // 一条正则吃尽两种函数形式
    // ^\s*(?:function\s*\(([^)]*)\)\s*\{([\s\S]*)\}|   // function(...) { ... }
    //    \(([^)]*)\)\s*=>\s*(?:\{([\s\S]*)\}|(.+)))$   // (...) => { ... } 或 (...) => expr
    const m =
        /^\s*(?:function\s*\(([^)]*)\)\s*\{([\s\S]*)\}|\(([^)]*)\)\s*=>\s*(?:\{([\s\S]*)\}|(.+)))$/m.exec(
            fnStr,
        );

    if (!m) return;

    // 解构出捕获组
    // m[1/2] -> function(...) { ... }
    // m[3/4/5] -> 箭头函数
    const [, fnParams, fnBody, afParams, afBodyBlock, afBodyExpr] = m;

    const params = (fnParams || afParams)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    const body = fnBody || afBodyBlock || `return ${afBodyExpr}`;

    try {
        return new Function(...params, body);
    } catch {}

    // if (fnStr.startsWith('```') && fnStr.endsWith('```')) {
    //     fnStr = fnStr.slice(3, fnStr.length - 3);
    // }

    // // 普通函数
    // const match1 = fnStr.match(/^function\s*\(([^)]*)\)\s*\{([\s\S]*)\}$/);
    // if (match1) {
    //     const [, params, body] = match1;
    //     return new Function(...params.split(',').map((p) => p.trim()), body);
    // }

    // // 箭头函数
    // try {
    //     // 处理单行表达式形式的箭头函数: (params) => expression
    //     const match2 = fnStr.match(/^\(([^)]*)\)\s*=>\s*(?!\{)(.+)$/);
    //     if (match2) {
    //         const [, params, body] = match2;
    //         return new Function(...params.split(',').map((p) => p.trim()), `return ${body}`);
    //     }

    //     // 处理带花括号的多行语句形式的箭头函数: (params) => { statements }
    //     const match3 = fnStr.match(/^\(([^)]*)\)\s*=>\s*\{([\s\S]*)\}$/);
    //     if (match3) {
    //         const [, params, body] = match3;
    //         return new Function(...params.split(',').map((p) => p.trim()), body);
    //     }
    // } catch (e) {
    //     e;
    // }

    // return fnStr;
}
