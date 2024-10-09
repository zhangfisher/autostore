import { Dict } from "autostore"

 
export * from "./signal/types"

declare module "autostore"{  
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface AutoStoreOptions<State extends Dict> {
        // 指定一个错误边界组件，当信号组件渲染出错时，会调用此组件
        signalErrorBoundary?:React.ComponentType<{error:any}>
    }
}