import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Creates a validator function that checks if two controls have equivalent values.
 *
 * @param {string} firstControlName - The name of the first control.
 * @param {string} secondControlName - The name of the second control.
 * @return {ValidatorFn} A validator function that returns a ValidationErrors object if the controls have non-equivalent values, otherwise null.
 */
export const equivalentValidator = (firstControlName: string, secondControlName: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const firstControl = control.get(firstControlName);
      const secondControl = control.get(secondControlName);

      if (secondControl?.value && secondControl?.value !== firstControl?.value) {
        secondControl?.setErrors({ notEqual: true });
      } 

      return null;
    };
  };
  