import {Attribute, Directive, forwardRef} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, Validator} from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateEqual), multi: true }
  ]
})
export class ValidateEqual implements Validator {
  /*
  Validate that fields are equal (reverse=true) or not
   */

  constructor(@Attribute('validateEqual') public validateEqual: string, @Attribute('reverse') public reverse: string) { }

  private get isReverse() {
    if (this.reverse === 'true') {
      return true;
    }
    return false;
  }

  validate(c: AbstractControl): {[key: string]: any } {
    let v = c.value; // get self value
    let e = c.root.get(this.validateEqual); // get validateEqual attriubute value
    if (this.isReverse) {
      if (e && v === e.value) {
        return {validateEqualFails: true};
      }
    } else {
      if (e && v !== e.value) {
        return {validateEqualFails: true};
      }
    }
    return null;
  }

}
