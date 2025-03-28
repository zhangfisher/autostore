
export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean';
}

export const isBool = isBoolean;