import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RoutesConstant } from '../../../../constant/routes.constant';
import { markFormGroupTouched } from '../../../shared/util/form.util';
import { AuthService } from '../../../shared/service/auth.service';
import CryptoJS from 'crypto-js';
import { UserModel } from '../../../shared/model/user.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { tap } from 'rxjs/operators';
import { IResponse } from '../../../shared/model/IResponse.model';

@Component({
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss'],
  providers: [NzModalService],
})
export class SignInPageComponent implements OnInit {
  loginForm: FormGroup;
  passwordVisible: boolean = false;
  loginBtnDisable: boolean = true;
  loginBtnLoading: boolean = false;
  routeConstant = RoutesConstant;

  constructor(
    private authService: AuthService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  submit(): void {
    markFormGroupTouched(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }

    const cryptoPassword = CryptoJS.SHA256(this.password.value).toString();
    let userInfo: UserModel = {
      username: this.username.value,
      password: cryptoPassword,
    };

    this.loginBtnLoading = true;
    this.authService
      .login(userInfo)
      .pipe(
        tap((res: IResponse<any>) => {
          this.loginBtnLoading = false;
          if (res.status !== 'success') {
            this.modal.error({
              nzTitle: 'Failed',
              nzContent: res.errorMessage,
            });
          }
        })
      )
      .subscribe();
  }

  passwordToggle(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  get username(): AbstractControl {
    return this.loginForm.get('username');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }
}
