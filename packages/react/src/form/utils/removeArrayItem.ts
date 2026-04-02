export function removeArrayItem(arr: any[], item: any): number {
    let count: number = 0;
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            count++;
        }
    }
    return count;
}
