import { ValidateEqual } from './validate-equal.directive';
import {AbstractControl} from '@angular/forms';

describe('ValidateEqualDirective', () => {
  it('should create an instance', () => {
    const directive = new ValidateEqual('p@ssw0rd', 'false');
    expect(directive).toBeTruthy();
  });

  it('should be valid', () => {
    const directive = new ValidateEqual('p@ssw0rd', 'true');
    let control = <AbstractControl>{
      value: 'p@ssw0rd',
      root: {
        get(path: Array<string | number> | string): AbstractControl | null {
          return this;
        }
      }
    };
    expect(directive.validate(control)).toBeNull();
  });

  it('should be invalid with no reverse', () => {
    const directive = new ValidateEqual('p@ssw0rd', 'false');
    let control = <AbstractControl>{
      value: 'p@ssw0rd',
      root: {
        get(path: Array<string | number> | string): AbstractControl | null {
          return this;
        }
      }
    };
    expect(directive.validate(control)).toEqual({validateEqualFails: true});
  });

  it('should be invalid with reverse', () => {
    const directive = new ValidateEqual('p@ssw0rd', 'true');
    let control = <AbstractControl>{
      value: 'p@ssw0rd1',
      root: {
        get(path: Array<string | number> | string): AbstractControl | null {
          return <AbstractControl>{value: 'p@ssw0rd1'};
        }
      }
    };
    expect(directive.validate(control)).toEqual({validateEqualFails: true});
  });
});
