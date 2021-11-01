// angular module
import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

// models
import { ResetPasswordDto } from '../../shared/models/reset-password.model';
import { ResponseDto } from '../../shared/models/api-response.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent {

  // #region declare variables

  model: ResetPasswordDto;
  isSubmitted: boolean;
  passwordForm!: FormGroup;
  isPasswordMatch: boolean;
  password!: string;
  password2!: string;

  // #endregion

  // #region constructor

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogService: DialogService,
  ) {
    // init variables
    this.model = new ResetPasswordDto;
    this.isSubmitted = false;
    this.isPasswordMatch = true;

    // init forms
    this.initForm();
  }

  // #endregion

  // #region init forms

  initForm() {
    this.passwordForm = this.formBuilder.group({
      old_password: ['', Validators.required],
      password: ['', Validators.minLength(8)],
      password2: ['', Validators.required],
    });
  }

  // form controls
  get passwordFormControls() {
    return this.passwordForm.controls;
  }

  // #endregion

  // #region main actions

  changePassword(model: ResetPasswordDto) {
    this.isSubmitted = true;
    if (this.passwordForm.valid && this.isPasswordMatch)
      this.userService.changePassword(model).subscribe((res: ResponseDto) => {
        this.passwordForm.reset();
        this.dialogService.savedSuccessfully('User saved successfully!')
        this.isSubmitted = false;
      });
  }

  // #endregion


}
