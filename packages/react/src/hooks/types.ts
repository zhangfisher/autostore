import { ObjectKeyPaths,AsyncComputedGetter, 
    AsyncComputedObject, AsyncComputedValue, ComputedDescriptorBuilder, ComputedGetter, 
    ComputedOptions, ComputedState, Dict, ExtendAsyncOptions, SyncComputedObject, WatchListener, 
    WatchListenerOptions, GetTypeByPath, 
    WatchObject, WatchGetter, WatchDescriptorBuilder, WatchOptions, 
    WatchDependFilter,
    StateOperate
} from "autostore"

 
export type StateGetter<State extends Dict,Value=any> =  (state:ComputedState<State>)=>Value

export type StatePaths<State extends Dict> = ObjectKeyPaths<ComputedState<State>>
export type StateValue<State extends Dict,Path extends string> =GetTypeByPath<ComputedState<State>,Path>

// ********** useDeps ********** 

export interface UseDepsType<State extends Dict>{
    (selector: ObjectKeyPaths<ComputedState<State>> | StateGetter<State>,extendAsync?:ExtendAsyncOptions):string[][]
    (selector: (string | string[] | StateGetter<State>)[],extendAsync?:ExtendAsyncOptions):string[][]
 }

// ********** useState **********  



export type UseStateResult<Value,State extends Dict>=[Value extends Dict ? ComputedState<Value> : Value,(value:Value | ((state:ComputedState<State>)=>void))=>void]
export type UseStateGetter<Value,State extends Dict>= (state:ComputedState<State>)=>Value
export type UseStateSetter<SetValue,State extends Dict>= (value:SetValue,state:ComputedState<State>)=>void
export type UseStateComposeResult<Value,SetValue,State extends Dict>=[Value extends Dict ? ComputedState<Value> : Value,(value:SetValue | ((state:ComputedState<State>)=>void))=>void]

export interface UseStateType<State extends Dict> {
    <Path extends StatePaths<State> = StatePaths<State>>(selector: Path): UseStateResult<GetTypeByPath<State,Path> ,State>
    <Path extends StatePaths<State> = StatePaths<State>>(selector: Path,async:boolean): UseStateResult<AsyncComputedValue<GetTypeByPath<State,Path>> ,State>
    <Value=any>(selector: string[]): UseStateResult<Value,State>
    <Value=any>(selector: string[],async:boolean): UseStateResult<AsyncComputedValue<Value>,State>
    <Value=any,SetValue=any>(getter: UseStateGetter<Value,State>,setter?:UseStateSetter<SetValue,State>): UseStateComposeResult<Value,SetValue,State>
    (): UseStateResult<State,State>
}

// ********** useReactive **********  
export type UseReactiveResult<Value,State extends Dict>=UseStateResult<Value,State>
export type UseReactiveGetter<Value,State extends Dict>= UseStateGetter<Value,State>
export type UseReactiveSetter<SetValue,State extends Dict>=UseStateSetter<SetValue,State>

export interface UseReactiveType<State extends Dict> {
    <Path extends StatePaths<State> = StatePaths<State>>(selector: Path): UseReactiveResult<GetTypeByPath<ComputedState<State>,Path> ,State>
    <Path extends StatePaths<State> = StatePaths<State>>(selector: Path,async:boolean): UseReactiveResult<AsyncComputedValue<GetTypeByPath<State,Path>> ,State>
    <Value=any>(selector: string[]): UseReactiveResult<Value,State>
    <Value=any>(selector: ObjectKeyPaths<ComputedState<State>>,async:boolean): UseReactiveResult<AsyncComputedValue<Value>,State>
    <Value=any,SetValue=any>(getter: UseReactiveGetter<Value,State>,setter?:UseReactiveSetter<SetValue,State>): UseStateComposeResult<Value,SetValue,State>
    (): UseReactiveResult<State,State>
}

// ********** useAsyncState **********  

export interface UseAsyncStateType<State extends Dict>{
    <Path extends StatePaths<State> = StatePaths<State>>(selector: Path): StateValue<State,Path>
    <Value=any>(selector: string[]): AsyncComputedValue<Value>
}

// ********** useAsyncReactive **********  

export type UseAsyncReactiveType<State extends Dict> = UseAsyncStateType<State>


// ********** UseObserverObject **********
export interface UseObserverObjectType<State extends Dict>{
    <Value=any,Scope=ComputedState<State>>(getter:ComputedGetter<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=ComputedState<State>>(getter: AsyncComputedGetter<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope> ):AsyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=ComputedState<State>>(builder:ComputedDescriptorBuilder<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | AsyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=ComputedState<State>>(args:any,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | AsyncComputedObject<Value,Scope> | undefined
    <Value=any>(builder:WatchDescriptorBuilder<Value>,options?:WatchOptions<Value>):WatchObject<Value>
} 

// ********** useComputedObject **********
export interface UseComputedObjectType<State extends Dict>{
    <Value=any,Scope=ComputedState<State>>(getter:ComputedGetter<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=ComputedState<State>>(getter: AsyncComputedGetter<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope> ):AsyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=ComputedState<State>>(builder:ComputedDescriptorBuilder<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | AsyncComputedObject<Value,Scope> | undefined
    <Value=any,Scope=ComputedState<State>>(args:any,computedOptions?:ComputedOptions<Value,Scope>):SyncComputedObject<Value,Scope> | AsyncComputedObject<Value,Scope> | undefined
} 


// ********** useComputed **********
export interface UseComputedType<State extends Dict>{
    <Value=any,Scope=ComputedState<State>>(getter:ComputedGetter<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope>):AsyncComputedValue<Value> 
    <Value=any,Scope=ComputedState<State>>(getter: AsyncComputedGetter<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope> ):AsyncComputedValue<Value>
    <Value=any,Scope=ComputedState<State>>(builder:ComputedDescriptorBuilder<Value,Scope>,computedOptions?:ComputedOptions<Value,Scope>):AsyncComputedValue<Value>
    <Value=any,Scope=ComputedState<State>>(args:any,computedOptions?:ComputedOptions<Value,Scope>):AsyncComputedValue<Value> 
} 

 
 
//  ********** useWatch **********

export type UseWatchGetter<Value,DependValue> = (operate:StateOperate<DependValue>)=>Value | undefined | Promise<Value | undefined>
export type UseWatchSetter<Value> = (value:Value)=>void
export type UseWatchOptions<Value> = WatchListenerOptions & { 
    initial?:Value         // 提供初始值    
}

export interface UseWatchType<State extends Dict> {
    <Value=any,DependValue=any>(selector: ObjectKeyPaths<ComputedState<State>>,getter:UseWatchGetter<Value,DependValue>,options?:UseWatchOptions<Value>): [Value,UseWatchSetter<Value>]
    <Value=any,DependValue=any>(selector: string[],getter:UseWatchGetter<Value,DependValue>,options?:UseWatchOptions<Value>): [Value,UseWatchSetter<Value>]
    <Value=any,DependValue=any>(getter:UseWatchGetter<Value,DependValue>,options?:UseWatchOptions<Value>): [Value,UseWatchSetter<Value>]
}