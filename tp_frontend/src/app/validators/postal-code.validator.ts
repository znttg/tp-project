import { AbstractControl, ValidatorFn } from '@angular/forms';

export function canadianPostalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(control.value);
    return valid ? null : { invalidPostalCode: { value: control.value } };
  };
}