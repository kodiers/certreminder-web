export function formatDateToStr(date: Date): string {
  /*
  Function to format date to 'YYYY-mm-dd' format
   */
  const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return dateStr;
}
