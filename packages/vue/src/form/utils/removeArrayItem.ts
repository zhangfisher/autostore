
export function removeArrayItem(arr: any[], item: any) {
    const index = arr.indexOf(item);
    if (index >= 0) {
        arr.splice(index, 1);
    }
}