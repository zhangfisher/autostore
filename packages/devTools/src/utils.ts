
export class WeakObjectMap<T extends object> {
    private map: Map<string, WeakRef<T>>;
    private finalizationRegistry: FinalizationRegistry<string>;
  
    constructor() {
      this.map = new Map();
      this.finalizationRegistry = new FinalizationRegistry((key) => {
        this.map.delete(key);
      });
    }
  
    set(key: string, value: T): void {
      const weakRef = new WeakRef(value);
      this.map.set(key, weakRef);
      this.finalizationRegistry.register(value, key);
    }
  
    get(key: string): T | undefined {
      const weakRef = this.map.get(key);
      return weakRef ? weakRef.deref() : undefined;
    }
  
    delete(key: string): boolean {
      return this.map.delete(key);
    }
  
    has(key: string): boolean {
      const weakRef = this.map.get(key);
      return weakRef ? weakRef.deref() !== undefined : false;
    }
}
/**
 *  判定两个值是否相等
 * 
 *  如果两个值都是对象，则判断两个对象是否相等
 * 如果两个值都是数组，则判断两个数组的值是否相等
 * 
 */

export function isPathEq(a:string[] | undefined,b:string[] | undefined):boolean{
  if(!a) return false
  if(!b) return false
  if(a.length!==b.length) return false
  return a.every((item,index)=>item===b[index])
}
/**
 *  判断一个路径destPath是否包含另一个路径basePath判断
 * @param basePath 
 * @param destPath 
 */
export function pathStartsWith(basePath:string[],destPath:string[]){
  if(basePath.length>destPath.length) return false
  return basePath.every((p,i)=>{
      return p===destPath[i]
  })
}

export function analysisCyclePath(steps:string[],curPath:string):[string | undefined,number] {
  // 使用curPath将steps分割为多个数组
  const indexs = steps.reduce((prev,cur,index)=>{
      if(cur===curPath) prev.push(index)            
      return prev
  },[] as number[])

  const groups = indexs.map((v,i)=>{
      if(i<indexs.length-1){
          return steps.slice(v,indexs[i+1])
      }else{
          return steps.slice(v)
      }        
  })

  // 找到groups相同的分组
  const results = new Map<string,number>()
  for(let i=0;i<groups.length;i++){
      const group = groups[i]
      if(group.length<2) continue
      for(let j=i+1;j<groups.length;j++){
          const group2 = groups[j]
          if(isPathEq(group,group2) || pathStartsWith(group,group2)){
              const gKey = group.join('->')
              if(!results.has(gKey)){
                  results.set(gKey,1)
              }
              const n = results.get(gKey)!                
              results.set(gKey,n+1)
          }
      }
  }
  // 找到results里面路径最长的
  let count = 0
  let paths = undefined
  results.forEach((v,k)=>{
      if(v<3) return
      if(k.length>count){
        paths = k
        count = v          
      }
  }) 
  return [paths,count]

}
