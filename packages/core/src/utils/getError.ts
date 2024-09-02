

export function getError(e:any):Error{
    return  e instanceof Error ? e : new Error(e)
}