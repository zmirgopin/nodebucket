import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
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
function employeeIdValidator(control: FormControl) {
  const value = control.value;
  if (value >= 1007 && value <= 1012) {
    return { employeeIdValidator: false }; // Valid
  }
  return { employeeIdInvalid: true }; // Invalid
}

function attachBaseUrl(url: string) {
  const base = '/';
  return base + url.replace(/^\//, '');
}

export interface IEmployee {
  _id: string;
  empId: number;
  name: string;
  tasks: string[];
  __v: number;
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router
  ) {
    // employeeIdFormControl = new FormControl('', [
    //   Validators.required,
    //   employeeIdValidator,
    // ]);
    this.form = this.fb.group({
      employeeId: ['', [Validators.required, employeeIdValidator]],
    });
  }

  fetchWithHttpClient(empId: string) {
    return this.http
      .get<IEmployee>(attachBaseUrl('/api/employees/') + empId)
      .subscribe({
        next: (res) => {
          //get employee information and set the cookie
          this.cookieService.set('name', res.name);
          this.cookieService.set('empId', '' + res.empId);
          console.log('loging successfull');
          //navigate to task page
          this.router.navigate(['/tasks']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    // .unsubscribe();
  }

  doSignin($event: SubmitEvent) {
    const { employeeId } = this.form.value;
    console.log('form submitted..', { $event, employeeId });

    this.fetchWithHttpClient(employeeId);
  }
}
