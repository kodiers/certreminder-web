import { Directive } from '@angular/core';
import {FormControl, NG_VALIDATORS} from '@angular/forms';

export function passwordRules(control: FormControl):{[key: string]: boolean} {
  /*
  Validate that password meet following requirements:
  Password should be 8+ characters and cannot contains only digits
   */
  const passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})");
  const password = control.value;
  if (passwordPattern.test(password)) {
    return null;
  }

  return {viloaterules: true};
}

@Directive({
  selector: '[appPasswordRules]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: passwordRules,
      multi: true
    }
  ]
})
export class PasswordRules {

  constructor() { }

}
