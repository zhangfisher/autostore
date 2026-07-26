import { PATH_DELIMITER } from "../consts";

export function normalizePath(path: string[] | string): string[] {
    return Array.isArray(path) ? path : path.split(PATH_DELIMITER);
}
