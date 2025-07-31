import { isAsyncComputedValue } from './isAsyncComputedValue';
import { isFunction } from './isFunction';

/**
 * 获取当前状态的快照
 *
 * state是一个经过proxy代码对象，嵌套对象也同样是proxy对象
 *
 * @example
 *
 * const store = new AutoStore({
 *      order:{
 *          price:2,
 *          count:3,
 *          total:(scope:any)=>scope.price * scope.count
 *      }
 * })
 *
 * getSnapshot(store.state)  === {order:{price:2,count:3,total:6}}
 *
 *
 * @example
 *
 * const store = new AutoStore({
 *      order:{
 *          price:2,
 *          count:3,
 *          total:async (scope:any)=>scope.price * scope.count
 *      }
 * })
 *
 * getSnapshot(store.state)  === {order:{price:2,count:3,total:
 *                              {value:6,loading,timeout,.......}
 *                         }}
 *
 * getSnapshot(store.state,false)  === {order:{price:2,count:3,total:6}}
 *
 *
 * @param state
 * @param reserveAsync - 是否保留异步对象。异步对象的值是一个AsyncComputedValue对象。=true时会保留。=false时会只返回value值
 * @param includeFunc - 是否将函数转换为字符串"$$F<函数代码>F$$"
 * 默认不会
 */
export function getSnapshot(
    state: object,
    options?: { reserveAsync?: boolean; includeFunc?: boolean },
) {
    const { reserveAsync, includeFunc } = Object.assign({ reserveAsync: false }, options);
    if (Array.isArray(state)) {
        const snapshot = [...state];
        for (let i = 0; i < snapshot.length; i++) {
            snapshot[i] = getSnapshot(snapshot[i], options);
        }
        return snapshot;
    } else if (typeof state === 'object') {
        if (!reserveAsync && isAsyncComputedValue(state)) {
            return state.value;
        } else {
            const snapshot: any = { ...state };
            for (const key in snapshot) {
                snapshot[key] = getSnapshot(snapshot[key], options);
            }
            return snapshot;
        }
    }
    if (includeFunc && isFunction(state)) {
        return `\`\`\`${(state as any).toString()}\`\`\``;
    }
    return state;
}

// import { AutoStore } from "../store/store"
// const store = new AutoStore({
//     shop:{
//         order:{
//             price:2,
//             count:3,
//             total:async (scope:any)=>scope.price * scope.count
//         },
//         addresss:[
//             {
//                 city:"beijing",
//                 street:"wangfujing"
//             },
//             {
//                 city:"shanghai",
//                 street:"nanjing road"
//             }
//         ]
//     }

// })

// console.log(JSON.stringify(getSnapshot(store.state)))
// console.log(JSON.stringify(getSnapshot(store.state,{reserveAsync:false})))
// console.log(JSON.stringify(getSnapshot(store.state.shop.order)))
// console.log(JSON.stringify(getSnapshot(store.state.shop.addresss.0)))
