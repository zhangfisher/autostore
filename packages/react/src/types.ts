import React from "react"
import { AsyncComputedResult } from "autostore"

 

export type AsyncComponentRender = (params:AsyncComputedResult)=>React.ReactNode
export type SyncComponentRender<Value=any> = (value:Value)=>React.ReactNode