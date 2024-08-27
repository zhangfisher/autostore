/**
 * 
 * 在signal的基础上提供计算属性功能
 * 
 * const signal = createSignal({a:1,b:2,c:[1,2,3]})
 * 
 * 1. 创建计算属性
 * 
 * 
 * 
 * 
 * 
 * 
 * - 同步计算属性
 * const c = obj.computed<T>((data)=>{
 *      return data.a+data.b
 * },{
 *    initial:true
 *    onUpdate:()=>{
 *        当依赖的数据发生变化时，触发本回调
 *    }
 * }) 
 * 
 * - 异步计算属性
 * 
 *  const c = obj.computed(async (data)=>{
 *      return data.a+data.b+data.c[2]
 * },[
 *      ['a'],['b'],['data','c','2']                 // 指定依赖的数据的路径
 * ],{
 *    initial:1                   // 初始值
 *    onUpdate:([a,b,c2],{depends})=>{
 *         // 当依赖的数据发生变化时，触发本回调
 *    }
 * }) 
 * 
 * 2. 计算属性声明
 * 
 *  {
 *     value:T                      // 计算属性的结果值
 *     depends:string[][]           // 依赖的数据的路径
 *     immediate:boolean            // 对异步计算属性是否在
 *  }
 * 
 *  
 * 
 * 
 * 
 * 
 * 
 */
export {}



    // /**
    //  * 收集依赖
    //  */
    // private collectDependencies(){
    //     const dependencies:string[][] = []
    //     const traverse = (obj: any, parentPath: string[]) => {
    //         if (typeof obj !== 'object' || obj === null) {
    //             return;
    //         }
    //         for (const key of Object.keys(obj)) {
    //             const value = obj[key];
    //             const path = [...parentPath, key];
    //             if (typeof value === 'function') {
    //                 // 通过运行函数来收集依赖
    //                 this.runSyncFunction(value, path);
    //             } else {
    //                 traverse(value, path);
    //             }
    //         }
    //     };
    //     traverse(this._data, []);
    // }
    // private runSyncFunction(func: Function, path: string[]) {
    //     // 在运行同步时，收集依赖
    //     const listenerId =this.on(({ operate, path }) => {
    //         if(operate==='get'){
    //             dependencies.push(path)
    //         }
    //     }) 
    //     func.call(this,this._data)
    //     this.off(listenerId)
    //     this.dependencies.set(path.join('.'),new Set(dependencies))
    // }