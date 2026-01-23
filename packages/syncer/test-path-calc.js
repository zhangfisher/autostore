// 模拟路径计算逻辑

const localEntry = [];
const remote = [];

// 场景 1：浏览器页签发送删除事件
// operate.path = ['todos']
console.log("=== 场景 1：浏览器 -> Worker ===");
let operatePath = ['todos'];
console.log("原始 operate.path:", operatePath);
console.log("localEntry:", localEntry);
console.log("remote:", remote);

// 假设 _mapPath 返回原路径
const newPath = operatePath; 
operatePath = newPath;

const toPath = [...localEntry, ...operatePath.slice(remote.length)];
console.log("toPath:", toPath);
console.log("预期: ['todos']");
console.log("结果正确?", JSON.stringify(toPath) === JSON.stringify(['todos']));

console.log("\n=== 场景 2：如果 _mapPath 返回新路径 ===");
operatePath = ['todos', 'some', 'nested'];
console.log("原始 operate.path:", operatePath);

// _mapPath 可能返回不同的路径
const mappedPath = ['todos'];  // 简化了路径
operatePath = mappedPath;

const toPath2 = [...localEntry, ...operatePath.slice(remote.length)];
console.log("映射后 operate.path:", operatePath);
console.log("toPath:", toPath2);
