import { createAsyncComptuedValue } from "autostore"

export function initFieldOptions(options: Record<string, any>, addOptions: Record<string, any>) {
    Object.entries(addOptions).forEach(([key, value]) => {
        if (options[key] === undefined) {
            options[key] = createAsyncComptuedValue(value)
        }
    })
}