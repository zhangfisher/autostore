import { AutoStore, Dict } from 'autostore';
export class ReactAutoStore<State extends Dict> extends AutoStore<State>{
    /**
     * 
     * 创建一个响应式的组件，当数据发生变化时，组件会自动更新
     * 
     * @example
     * 
     * import { createStore } from "autostore-react"
     * 
     * const { state, $ } = createStore({
     *      firstName:'zhang',
     *      lastName:'san'
     *      fullName: (user)=>{
     *          return user.firstName + ' ' + user.lastName
     *      }
     * })
     * 
     * <div>
     *      $(state.firstName)
     *      $(()=>state.fullName)
     * </div>
     * 
     * 
     * @param selector 
     * @returns 
     */
    $(selector: any){

        return <>{}</>
    }
}