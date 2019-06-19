import { ValidateEqual } from './validate-equal.directive';

describe('ValidateEqualDirective', () => {
  it('should create an instance', () => {
    const directive = new ValidateEqual('p@ssw0rd', 'false');
    expect(directive).toBeTruthy();
  });
});
