/**
 * 判断是否arr1是否是arr2的子集
 * @param arr1 
 * @param arr2 
 */
function isSubset(arr1: string[],arr1Index:number, arr2: string[],arr2Index:number): boolean {
    if (arr1.length-arr1Index === 0) return true;   
    if (arr1.length-arr1Index  > arr2.length-arr2Index) return false; 
    let startIndex = arr2.findIndex((item,index) => index>=arr2Index ? item === arr1[arr1Index] : false);
    if (startIndex === -1) return false;
    for(let i=arr1Index;i<arr1.length;i++){
        if(arr1[i] !== arr2[startIndex+i-arr1Index]){
            return false
        }
    }
    return true
}

function isSliceEq(arr1:string[],arr2:string[],len:number):boolean{
    if(len==0) return true
    return arr1.every((item,index) => index<len ? item === arr2[index] : true)
}


/**
 * 合并两条依赖链，返回合并后的依赖链
 * 
 * @description
 * 
 * 需要判断两条依赖链是否可以合并，如果可以合并，则返回合并后的依赖链
 * 
 * @example
 * 
 * mergeDepRule(
 *      ['a', 'b', 'c', 'd'],
 *      ['a', 'b', 'x', 'c', 'd']
 * ) === [['a', 'b', 'x', 'c', 'd']]
 * 
 * mergeDepRule(
 *      ['a', 'b', 'c', 'd'],
 *      ['x', 'y', 'z']
 * ) === [['a', 'b', 'c', 'd'],
 *      ['x', 'y', 'z']
 * ]
 * @param item1 
 * @param item2 
 */
export function mergeDepChain(chain1:string[],chain2:string[]):string[][]{    
    if(chain1.length===0 && chain2.length===0) return []
    if(chain1.length===0) return [chain2]
    if(chain2.length===0) return [chain1]
    let shortChain = chain1.length > chain2.length ? chain2 : chain1
    let longChain  = chain1.length > chain2.length ? chain1 : chain2
    for(let i=0;i<shortChain.length;i++){
        if(isSliceEq(shortChain,longChain,i) && isSubset(shortChain,i,longChain,i)){
             return [longChain]
        }
    }
    return [chain1,chain2]
}
  