
export function isNumber(value: any): boolean {
  if (typeof value === 'number') return true;
  if (typeof value !== 'string') return false;
  return !isNaN(value as any) && !isNaN(parseFloat(value));
}