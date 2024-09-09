import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Custom Validator to check if the input contains only numeric characters
export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isNumeric = /^[0-9]*$/.test(control.value); // Regex to check if input contains only numbers
    return isNumeric ? null : { notNumeric: true }; // Return error object if non-numeric, otherwise null
  };
}