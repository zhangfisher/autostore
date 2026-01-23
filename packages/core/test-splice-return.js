// 测试 splice 返回值
const arr1 = [0, 1, 2, 3];
const deleted1 = arr1.splice(1, 1);
console.log("splice(1, 1) 删除:", deleted1);
console.log("删除后数组:", arr1);
console.log("deletedItems.length > 0?", deleted1.length > 0);

const arr2 = [0, 1, 2, 3];
const deleted2 = arr2.splice(1, 0);  // 删除 0 个元素
console.log("\nsplice(1, 0) 删除:", deleted2);
console.log("删除后数组:", arr2);
console.log("deletedItems.length > 0?", deleted2.length > 0);

const arr3 = [0, 1, 2, 3];
const deleted3 = arr3.splice(10, 1);  // 超出范围的索引
console.log("\nsplice(10, 1) 删除:", deleted3);
console.log("删除后数组:", arr3);
console.log("deletedItems.length > 0?", deleted3.length > 0);
