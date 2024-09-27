import React from "react"
import { AsyncComputedValue } from "@autostorejs/core"

 

export type AsyncComponentRender = (params:AsyncComputedValue)=>React.ReactNode
export type SyncComponentRender<Value=any> = (value:Value)=>React.ReactNode