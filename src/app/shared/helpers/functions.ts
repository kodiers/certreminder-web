import {HttpErrorResponse} from '@angular/common/http';

import * as moment from 'moment';

import {API_DATE_FORMAT} from '../constants';


export function formatDateToStr(date: Date): string {
  /*
  Function to format date to 'YYYY-mm-dd' format
   */
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function deleteItemFromArray(arr: any[], itemToDelete: any): any[] {
  /*
  Delete item from array
   */
  const copiedArr = arr.slice();
  const index = copiedArr.indexOf(itemToDelete);
  copiedArr.splice(index, 1);
  return copiedArr;
}

export function formatDate(date: Date): string {
  /*
  Format date
   */
  return moment(date).format(API_DATE_FORMAT);
}

export function extractErrorMessage(error: HttpErrorResponse): string {
  /*
  Extracts error messages as string from HttpErrorResponse
   */
  const errorMsg = error.error;
  let result = '';
  for (let key in errorMsg) {
    if (errorMsg.hasOwnProperty(key)) {
      const fieldMessage = errorMsg[key];
      for (let field in fieldMessage) {
        if (fieldMessage.hasOwnProperty(field) && fieldMessage[field].length > 0) {
          const message = fieldMessage[field][0];
          result = result + message + ' ';
        }
      }
    }
  }
  return result;
}
