import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoutesConstant} from "../../../../constant/routes.constant";
import {markFormGroupTouched} from "../../../shared/util/form.util";
import {AuthService} from "../../../shared/service/auth.service";
import CryptoJS from 'crypto-js';

@Component({
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  loginForm: FormGroup;
  passwordVisible: boolean = false;
  loginBtnDisable: boolean = true;
  loginBtnLoading: boolean = false;
  routeConstant = RoutesConstant;

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.loginForm = new FormGroup({
      username: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  submit(): void {
    markFormGroupTouched(this.loginForm);
    if (this.loginForm.invalid) {
      return;
    }

    const cryptoPassword = CryptoJS.SHA256(this.password.value).toString();

    this.loginBtnLoading = true;
    this.authService.login(this.username, cryptoPassword).subscribe(res => {
      this.loginBtnLoading = false;
    })

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
