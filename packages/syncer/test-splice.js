// 测试 splice 的参数
const arr = [0, 1, 2, 3, 4];
console.log("原始数组:", arr);

// 模拟 syncer 中的调用方式
// indexs = [1] 表示删除索引 1 的 1 个元素
const indexs = [1];
arr.splice(indexs[0], indexs.length);
console.log("splice(1, 1) 后:", arr);

// 重置数组
const arr2 = [0, 1, 2, 3, 4];
// indexs = [1, 2] 表示删除索引 1-2 的 2 个元素
const indexs2 = [1, 2];
arr2.splice(indexs2[0], indexs2.length);
console.log("splice(1, 2) 后:", arr2);
