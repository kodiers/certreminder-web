import { PasswordRules, passwordRules } from './password-rules.directive';
import {FormControl} from '@angular/forms';

describe('PasswordRules', () => {
  it('should create an instance', () => {
    const directive = new PasswordRules();
    expect(directive).toBeTruthy();
  });

  it('should passwordRules be valid', () => {
    let control = <FormControl> {
      value: 'p@ssw0rdP@ssw0rd'
    };
    expect(passwordRules(control)).toBeNull();
  });

  it('should passwordRules be invalid', () => {
    let control = <FormControl> {
      value: 'test'
    };
    expect(passwordRules(control)).toEqual({viloaterules: true});
  });
});
