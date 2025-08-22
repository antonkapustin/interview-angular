import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxLengthTrimmed(max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (value == null) return null;

    const trimmed = value.trim();
    return trimmed.length > max ? { maxlength: { requiredLength: max, actualLength: trimmed.length } } : null;
  };
}