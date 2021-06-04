import { NgModule } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SignUpRoutingModule } from './sign-up-routing.module';
import { SignUpPageComponent } from './page/sign-up-page/sign-up-page.component';
import { SharedModule } from '../shared/shared.module';
import { SignUpService } from './sign-up.service.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [SharedModule, SignUpRoutingModule],
  providers: [SignUpService, NzModalService],
})
export class SignUpModule {
  constructor(
    private fb: FormBuilder,
    private signupServie: SignUpService,
    private modal: NzModalService,
    private http: HttpClient
  ) {}
  signupForm: FormGroup;
  ngOnInit(): void {
    this.signupForm = this.fb.group({
      fullName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  submit() {
    const requestUrl = 'http://127.0.0.1:8080/auth/register';

    const formData = new FormData();
    formData.append('username', this.signupForm.value.username);
    formData.append('password', this.signupForm.value.password);
    formData.append('email', this.signupForm.value.email);
    formData.append('fullName', this.signupForm.value.fullName);

    this.http
      .post(requestUrl, formData)
      // .registerAccount(
      // {
      // username: this.signupForm.value.username,
      // password: this.signupForm.value.password,
      // email: this.signupForm.value.email,
      // fullName: this.signupForm.value.fullName,

      // })
      .subscribe(
        (data: any) => {
          if (data.status == 'success') {
            this.modal.success({
              nzTitle: 'Login Message',
              nzContent: 'Account registered successfully',
            });
          } else {
            this.modal.error({
              nzTitle: 'Login Message',
              nzContent: data.message,
              nzOnOk: () => console.log(data.message),
            });
          }
        },
        (error) => {
          this.modal.error({
            nzTitle: 'Login Message',
            nzContent: 'Failed to login. Failed to retrieve data from server',
            nzOnOk: () => console.log(error),
          });
        }
      );
    // } else {
    // }
  }
}
