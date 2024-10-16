import { Dict } from "autostore"
import { ReactAutoStore } from "../store"
import { useEffect, useState } from "react"




export function createFormComponent<State extends Dict>(store:ReactAutoStore<State>){
    return function Form(props:React.PropsWithChildren<{}>){
        const [state,setState] = useState(store.state)
        useEffect(()=>{
            const watcher = store.watch(()=>{
                setState(store.state)
            })
            return ()=>{
                watcher.off()
            }
        },[])
        return <form {...props} onSubmit={e=>{
            e.preventDefault()
            store.update(state=>{
                 
            })
        }}>
            {props.children}
        </form>
    }
}