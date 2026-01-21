import type { ConfigSource } from '../schema/manager';
import { isPlainObject } from './isPlainObject';

export function isConfigSource(obj: any): obj is ConfigSource {
    return isPlainObject(obj) && 'load' in obj;
}
