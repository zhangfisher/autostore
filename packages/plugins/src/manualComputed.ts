import { ComputedObject, ComputedObjects, RuntimeComputedOptions, TimeoutError } from "autostore";


 if(!ComputedObjects.prototype.enableGroup){
        ComputedObjects.prototype.enableGroup=function(this:ComputedObjects<any>,group:string,value: boolean) {
                for (const computedObject of this.values()) {            
                    if(computedObject.group===group){
                        computedObject.options.enable = value;
                    }
                    
                }
            }
    }
    
    /**
     * 运行指定组的计算函数
     *
     * 注意：并不会等待所有的计算函数都执行完毕，而是返回一个Promise.all
     *
     * @param string
     * @param
     * @param string
     * @param param3
     */
    if(!ComputedObjects.prototype.runGroup){
        ComputedObjects.prototype.runGroup=async function(
                this:ComputedObjects<any>,
                group: string,
                runArgs?: RuntimeComputedOptions,
                options?: { wait?: boolean; timeout?: number },
            ) {
            return await this.run(
                (computedObject: ComputedObject) => computedObject.group === group,
                runArgs,
                options,
            );
        }
    }
interface RunComputedObjects{
    (this:ComputedObjects<any>,
        filter: (computedObject: ComputedObject) => boolean,
        runArgs?: RuntimeComputedOptions,
        options?: { wait?: boolean; timeout?: number },
    ): Promise<any>;
    (this:ComputedObjects<any>,
        id: string,
        runArgs?: RuntimeComputedOptions,
        options?: { wait?: boolean; timeout?: number },
    ): Promise<any>;
}
    /**
     * 运行指定id或满足条件的计算函数
     *
     * 当wait=true时则等待所有的计算函数执行完毕
     * 也可以指定一个timeout时间，超时后会抛出异常TIMEOUT
     *
     *
     * @param filter
     * @param runArgs 传递给计算属性的run函数的参数
     * @param options
     */
if(!ComputedObjects.prototype.run){
    ComputedObjects.prototype.run= async function run(this:ComputedObjects<any>): Promise<any> {
        if (arguments.length === 0) {
            return Promise.all(
                [...this.values()].map((computedObject) => {
                    return computedObject.run() as any;
                }) as Promise<any>[],
            );
        }
        let filter: (computedObject: ComputedObject) => boolean;
        if (typeof arguments[0] === "function") {
            filter = arguments[0];
        } else if (typeof arguments[0] === "string") {
            // 运行指定的id
            filter = (computedObject: ComputedObject) => computedObject.id === arguments[0];
        }

        const computedRunArgs = Object.assign({}, arguments[1]) as RuntimeComputedOptions;

        const options = Object.assign({ wait: false, timeout: 0 }, arguments[2]) as {
            wait: boolean;
            timeout: number;
        };

        // 等待所有的计算函数执行完毕
        const dones: Record<string, boolean> = {}; // 记录各个计算函数是否执行完毕
        return new Promise<void>((resolve, reject) => {
            // 是否等待所有的计算函数执行完毕
            if (options.wait) {
                let tmId: any;
                computedRunArgs.onDone = ({ id }) => {
                    dones[id] = true;
                    if (Object.values(dones).every((v) => v)) {
                        clearTimeout(tmId);
                        return true;
                    }
                };
                if (options.timeout > 0) {
                    tmId = setTimeout(() => {
                        reject(new TimeoutError());
                    }, options.timeout);
                }
            }
            Promise.all(
                [...this.values()]
                    .filter((obj: ComputedObject) => {
                        if (filter(obj)) {
                            dones[obj.id] = false;
                            return true;
                        }
                        return false;
                    })
                    .map((computedObject) => {
                        return computedObject.run(computedRunArgs) as any;
                    }),
            );
            if (!options.wait) {
                resolve();
            }
        });
    }


}

declare module "autostore" {
    export interface ComputedObjects{
        enableGroup(group:string,value: boolean):void
        runGroup(group: string,runArgs?: RuntimeComputedOptions,options?: { wait?: boolean; timeout?: number }):Promise<any>        
        run:RunComputedObjects
    }
}

