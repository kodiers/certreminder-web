import {deleteItemFromArray, formatDate, formatDateToStr} from './functions';
import * as moment from 'moment';
import {API_DATE_FORMAT} from '../constants';

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
});
