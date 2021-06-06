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
import { SignUpModel } from '../../../shared/model/sign-up.model';
import { tap } from 'rxjs/operators';
import CryptoJS from 'crypto-js';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss'],
})
export class SignUpPageComponent implements OnInit {
  signupForm: FormGroup;
  passwordVisible: boolean = false;
  signUpBtnDisable: boolean = true;
  signUpBtnLoading: boolean = false;
  routeConstant = RoutesConstant;

  constructor(
    private authService: AuthService,
    private modal: NzModalService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signupForm = new FormGroup({
      fullName: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
    });
  }

  submit(): void {
    markFormGroupTouched(this.signupForm);
    if (this.signupForm.invalid) {
      return;
    }

    const signUpModel: SignUpModel = this.signupForm.getRawValue();
    signUpModel.password = CryptoJS.SHA256(this.password.value).toString();

    this.signUpBtnLoading = true;
    this.authService
      .signUp(signUpModel)
      .pipe(
        tap((res) => {
          this.signUpBtnLoading = false;
        })
      )
      .subscribe(
        (data: any) => {
          if (data.status == 'success') {
            this.modal.success({
              nzTitle: 'Registration',
              nzContent: 'New account registered successfully',
            });
          } else {
            this.modal.success({
              nzTitle: 'Registration',
              nzContent: data.errorMessage,
            });
          }
        },
        (error: any) => {
          this.modal.success({
            nzTitle: 'Registration',
            nzContent: error,
          });
        }
      );
  }

  passwordToggle(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  get fullName(): AbstractControl {
    return this.signupForm.get('fullName');
  }

  get username(): AbstractControl {
    return this.signupForm.get('username');
  }

  get email(): AbstractControl {
    return this.signupForm.get('email');
  }

  get password(): AbstractControl {
    return this.signupForm.get('password');
  }
}
