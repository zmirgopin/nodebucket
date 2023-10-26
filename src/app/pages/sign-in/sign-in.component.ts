import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
/**
 * A Sign In page for nonauthenticated employees.
Design a sign in page that is consistent with
your selected house theme.
R – 5.1 The sign in form will have one
field for employeeId and a
submit button.
Only allow valid numerical values in the
range of 1007-1012. All other entries must
be rejected. Include the appropriate error
messages.
 */

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  employeeIdFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('d{4}'),
  ]);

  doSignin($event: SubmitEvent) {
    console.log('form submitted', { $event });
  }
}
