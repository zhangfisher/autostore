/**
 * 
 * 创建一个响应式对象
 * 
 * @example
 * const signal = createSignal({
 *      firstName: 'John',
 *      lastName: 'Doe'
 *      age: 30
 *      address: [
 *          {city: 'New York', street: 'Wall Street'},
 *          {city: 'Los Angeles', street: 'Hollywood Blvd'}
 *          {city: 'San Francisco', street: 'Golden Gate'}
 *      ],
 *      job: {
 *          title: 'Software Engineer',
 *          company: 'Google'
 *          salary: 100000
 *      }    
 * })
 * 
 * 侦听读取
 * signal.on({
 *      operate,            // 操作，取值: get,set,delete,insert
 *      path,               // 发生变化的路径，如：job.title，或者address.0.city
 *      value,              // 变化后的值
 *      oldValue,           // 变化前的值
 *      parentPath          // 发生变化的父路径
 *      parent              // 发生变化的父对象值
 * }=>{
 *  console.log(operate, path, value, oldValue, parentPath, parent)
 * })
 * 
 * signal.firstName = "Li"          // set firstName
 * console.log(signal.address[0].city)  // get address.0.city
 * 
 * 
 * 
 * 
 * 
 */
export type SignalListener = (event: {
    operate: 'get' | 'set' | 'delete' | 'insert',
    path: string[],
    value: any,
    oldValue: any,
    parentPath: string[],
    parent: any
}) => void;

export type CreateSignalOptions = {
    asyncNotice?:boolean                    // 使用异步通知
}

class Signal<T extends object> {
    private _data: T;
    private listeners: Map<number, SignalListener> = new Map();
    private nextListenerId: number = 0;
    private _options:Required<CreateSignalOptions>;

    constructor(initialData: T,options?:CreateSignalOptions) {
        this._options = Object.assign({asyncNotice:false},options);
        this._data = this.createProxy(initialData, []);
    }

    private createProxy(target: any, parentPath: string[]): any {
        if (typeof target !== 'object' || target === null) {
            return target;
        }

        return new Proxy(target, {
            get: (obj, prop, receiver) => {
                const value = Reflect.get(obj, prop, receiver);
                if(!Object.hasOwn(obj,prop) || typeof value === 'function'){
                    if(typeof value === 'function' && Array.isArray(obj)){
                        return (...args: any[]) => {
                            const oldLength = obj.length;
                            const result = value.apply(obj, args);
                            if (obj.length > oldLength) {
                                const path = [...parentPath];
                                this.notify('insert', path, args, undefined, parentPath, obj);
                            }
                            return result;
                        };
                    }
                    return value
                }
                const path = [...parentPath, String(prop)];
                this.notify('get', path, value, undefined, parentPath, obj);
                return this.createProxy(value, path);
            },
            set: (obj, prop, value, receiver) => {
                const oldValue = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.set(obj, prop, value, receiver);
                if (success) {
                    if (Array.isArray(obj) && prop === 'length') {
                        if (value < oldValue) {
                            this.notify('delete', path, undefined, oldValue, parentPath, obj);
                        }
                    } else {
                        this.notify('set', path, value, oldValue, parentPath, obj);
                    }
                }
                return success;
            },
            deleteProperty: (obj, prop) => {
                const oldValue = obj[prop];
                const path = [...parentPath, String(prop)];
                const success = Reflect.deleteProperty(obj, prop);
                if (success) {
                    this.notify('delete', path, undefined, oldValue, parentPath, obj);
                }
                return success;
            }
        });
    }
    private notifyListeners(operate: 'get' | 'set' | 'delete' | 'insert', path: string[], value: any, oldValue: any, parentPath: string[], parent: any) {
        for (const listener of this.listeners.values()) {
            listener({ operate, path, value, oldValue, parentPath, parent });
        }
    }
    private notify(operate: 'get' | 'set' | 'delete' | 'insert', path: string[], value: any, oldValue: any, parentPath: string[], parent: any) {          
        if(this._options.asyncNotice){
            setTimeout(()=>this.notifyListeners(
                operate, path, value, oldValue, parentPath, parent
            ),0)
        }else{
           this.notifyListeners(operate, path, value, oldValue, parentPath, parent);
        }        
    }

    public on(listener: SignalListener): number {
        const listenerId = this.nextListenerId++;
        this.listeners.set(listenerId, listener);
        return listenerId;
    }

    public off(listenerId: number) {
        this.listeners.delete(listenerId);
    }
    public once(listener: SignalListener): number {
        const listenerId = this.nextListenerId++;
        const onceListener: SignalListener = (event) => {
            listener(event);
            this.off(listenerId);
        };
        this.listeners.set(listenerId, onceListener);
        return listenerId;
    }
    public get data() {
        return this._data;
    }

}

function createSignal<T extends object>(initial: T,options?:CreateSignalOptions): Signal<T> {
    return new Signal(initial,options);
}

// 使用示例
const signal = createSignal({
    firstName: 'John',
    lastName: 'Doe',
    fullName: (data:any) => `${data.firstName} ${data.lastName}`,
    age: 30,
    address: [
        { city: 'New York', street: 'Wall Street' },
        { city: 'Los Angeles', street: 'Hollywood Blvd' },
        { city: 'San Francisco', street: 'Golden Gate' }
    ],
    job: {
        title: 'Software Engineer',
        company: 'Google',
        salary: 100000
    }
});

const listenerId = signal.on(({ operate, path, value, oldValue, parentPath, parent }) => {
    console.log("operate=", operate, ", path=", path.join('.'), ", value=", value, ", oldValue=", oldValue, ", parentPath=", parentPath.join('.'), ", parent=", parent);
});


const data = signal.data;
data.firstName = "Li"; // set firstName
data.address[0].city; // get address.0.city
data.address[0].city = 'Shanghai'; // set address.0.city
data.address.push({city:"QuanZhou",street:"JinJiang"}); // insert address.3
data.address.push(...[{city:"QuanZhou",street:"FengZe"},{city:"QuanZhou",street:"NanAn"}])
data.address[4]

// 取消订阅
signal.off(listenerId);