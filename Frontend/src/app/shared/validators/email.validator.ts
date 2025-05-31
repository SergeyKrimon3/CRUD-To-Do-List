import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Validates if the e-mail has a valid format
 */
export const emailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const EMAIL_REGEX: RegExp = /^[a-z0-9._]+@[a-z]+\.[a-z]{2,3}(\.[a-z]{2,})?$/g;
    const EMAIL_ERROR: { emailError: string } = { 
        emailError: 'validators.email',
    };

    if (!control?.value) {
        return null;
    }

    return EMAIL_REGEX.test(control?.value) ? null : { emailError: EMAIL_ERROR.emailError };
};