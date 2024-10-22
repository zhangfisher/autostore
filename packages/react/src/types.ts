import { Dict } from "autostore"

 
export * from "./signal/types"

declare module "autostore"{  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface AutoStoreOptions<State extends Dict> {
        // 指定一个错误边界组件，当信号组件渲染出错时，会调用此组件
        signalErrorBoundary?:React.ComponentType<{error:any}>
    }
}




// 定义一个辅助类型来提取类的所有公共属性
export type PublicProperties<T> = {
    [K in keyof T]: K extends `_${string}` ? never : K
}[keyof T];