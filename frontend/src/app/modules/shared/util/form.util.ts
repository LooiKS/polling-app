import {FormGroup} from "@angular/forms";

export function markFormGroupTouched(formGroup: FormGroup) {
  (<any>Object).values(formGroup.controls).forEach(control => {
    control.markAsTouched();
    control.markAsDirty();
    control.updateValueAndValidity();
    if (control.controls) {
      this.markFormGroupTouched(control);
    }
  });
}
