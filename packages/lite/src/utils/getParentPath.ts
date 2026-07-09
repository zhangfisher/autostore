export function getParentPath(path:string[]){
    if(!path) return []
    return path.slice(0,path.length-1)
}