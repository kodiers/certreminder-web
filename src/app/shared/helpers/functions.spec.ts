import {deleteItemFromArray, extractErrorMessage, formatDate, formatDateToStr} from './functions';
import * as moment from 'moment';
import {API_DATE_FORMAT} from '../constants';
import {HttpErrorResponse, HttpHeaders} from '@angular/common/http';

describe('functions', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date();
  });

  it('should format date',  () => {
    const result = formatDateToStr(date);
    expect(result).toEqual(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
  });

  it('should delete item from array', () => {
    const arr = ['a', 'b', 'c'];
    const result = deleteItemFromArray(arr, 'a');
    expect(result).toEqual(['b', 'c']);
  });

  it('should format date moment', () => {
    const result = formatDate(date);
    expect(result).toEqual(moment(date).format(API_DATE_FORMAT));
  });

  it('should extract error message', () => {
    const errorResponse = new HttpErrorResponse({
      error: {password: {password: ['Error']}}, headers: null, status: null, statusText: null, url: null
    });
    const message = extractErrorMessage(errorResponse);
    expect(message).toEqual('Error ');
  });
});
