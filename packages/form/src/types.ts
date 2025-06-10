/**
 * 
 * 用于提取已知属性的类型
 * 
 * type Ops = {
  a: number;
  b: boolean;
  c: string;
} & Record<string, any>;

type Test1 = KnownRecord<Ops>;
// 等价于 { a: number; b: boolean; c: string }

 * 
 */
export type KnownRecord<T, V = never> = {
    [K in keyof T as string extends K ? never :
    number extends K ? never :
    symbol extends K ? never : K
    ]: V extends never ? T[K] : V
};


export type MutableRecord<Items, KindKey extends string = "type"> = {
    [Kind in keyof Items]: { [type in KindKey]: Kind; } & Items[Kind];
}[keyof Items]
