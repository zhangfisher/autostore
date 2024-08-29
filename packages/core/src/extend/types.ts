import { SKIP_PROXY_FLAG, STATE_EXTEND_DESCRIPTOR_FLAG } from "../consts"
import { Dict } from "../types"


export type StateExtendType = 'watch' | 'computed'


export type StateExtendContext = {
    path:string[]
    value:any
    parentPath:string[]
    parent:any
}

export type StateExtendDescriptor<Getter extends Function  =Function ,Options extends Dict = Dict> = {    
    type                          : StateExtendType
    getter                        : Getter
    options                       : Options
    [STATE_EXTEND_DESCRIPTOR_FLAG]: true
    [SKIP_PROXY_FLAG]             : true        
}
    
