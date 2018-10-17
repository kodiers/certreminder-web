export function formatDateToStr(date: Date): string {
  /*
  Function to format date to 'YYYY-mm-dd' format
   */
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return dateStr;
}

export function deleteItemFromArray(arr: any[], itemToDelete: any): any[] {
  /*
  Delete item from array
   */
  const copiedArr = arr.slice();
  const index = copiedArr.indexOf(itemToDelete);
  if (index !== 1) {
    copiedArr.splice(index, 1);
  }
  return copiedArr;
}
