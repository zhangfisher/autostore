import { isNumber } from './isNumber';
import { getRawInputValue } from './getRawInputValue';

export function getInputValueFromEvent(e: any) {
    let val = getRawInputValue(e);
    if (typeof val === 'string') {
        if (isNumber(val)) {
            val = Number(val);
        } else if (val === 'true' || val === 'false') {
            val = val === 'true';
        } else if (
            (val.startsWith("'") && val.endsWith("'")) ||
            (val.startsWith('"') && val.endsWith('"'))
        ) {
            val = val.slice(1, val.length - 1);
        }
    }
    return val;
}
