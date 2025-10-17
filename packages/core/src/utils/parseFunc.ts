// biome-ignore lint/complexity/noBannedTypes: <noBannedTypes>
export function parseFunc(fnStr: string, defaultFunc: (...args: any[]) => any = () => {}): Function | undefined {
	// 统一剥离前后反引号包裹（数量不一致也剥离），兼容 ``` 代码块和语言标识
	fnStr = fnStr.replace(/^\s*`{3,}\w*(?:\r?\n|\n)/, "").replace(/^\s*`+\s*/, "");
	fnStr = fnStr.replace(/\s*`{3,}\s*$/, "").replace(/\s*`+\s*$/, "");
	// 清理可能的反斜杠转义导致的控制字符或多余反斜杠（例如 \f）
	fnStr = fnStr.replace(/^[\f\t\r\n]+/, "");
	fnStr = fnStr.replace(/^[\\]+(?=(?:async|function|\(|[A-Za-z_$]))/, "");

	// 支持普通/异步 function（命名或匿名）、箭头函数（含单参省略括号），并容忍结尾分号
	const mf = /^\s*(async\s+)?function(?:\s+\w+)?\s*\(([^)]*)\)\s*\{([\s\S]*)\}\s*;?\s*$/m.exec(fnStr);
	const ma = /^\s*(async\s+)?\(([^)]*)\)\s*=>\s*(?:\{([\s\S]*)\}|(.+))\s*;?\s*$/m.exec(fnStr);
	const mas = /^\s*(async\s+)?([A-Za-z_$][\w$]*)\s*=>\s*(?:\{([\s\S]*)\}|(.+))\s*;?\s*$/m.exec(fnStr);

	if (!mf && !ma && !mas) return;

	let isAsync = false;
	let params: string[] = [];
	let body = "";

	if (mf) {
		const [, asyncFlag, fnParams, fnBody] = mf;
		isAsync = Boolean(asyncFlag);
		params = (fnParams || "")
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);
		body = fnBody;
	} else if (ma) {
		const [, asyncFlag, afParams, afBodyBlock, afBodyExpr] = ma;
		isAsync = Boolean(asyncFlag);
		params = (afParams || "")
			.split(",")
			.map((s) => s.trim())
			.filter(Boolean);
		body = afBodyBlock || `return ${afBodyExpr}`;
	} else if (mas) {
		const [, asyncFlag, singleParam, afBodyBlock, afBodyExpr] = mas;
		isAsync = Boolean(asyncFlag);
		params = singleParam ? [singleParam] : [];
		body = afBodyBlock || `return ${afBodyExpr}`;
	}

	// 根据是否 async 选择构造函数
	const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor as FunctionConstructor;
	const Ctor: FunctionConstructor = isAsync ? (AsyncFunction as any) : Function;

	try {
		return new Ctor(...params, body);
	} catch {
		return defaultFunc;
	}
}
// console.log(parseFunc("``` ()=>{1}```"));
// console.log(parseFunc("```` ()=>1```"));
// console.log(parseFunc("```function (){1}```"));
// console.log(parseFunc("```function test(){\n1\n}```"));

// console.log(parseFunc("````async ()=>{1}```"));
// console.log(parseFunc("````async ()=>1```"));
// console.log(parseFunc("````async function (){1}```"));
// console.log(parseFunc("````async function test(){1}```"));
