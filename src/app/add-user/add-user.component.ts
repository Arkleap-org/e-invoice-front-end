// angular module
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

// models
import { ResponseDto } from '../shared/models/api-response.model';
import { UserRequestDto } from '../shared/models/user.model';

// services
import { DialogService } from '../shared/services/dialog.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  // #region declare variables

  model: UserRequestDto;
  isSubmitted: boolean;
  userForm!: FormGroup;
  isPasswordMatch: boolean;
  password!: string;
  password2!: string;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogService: DialogService,
  ) {

    this.model = new UserRequestDto;
    this.isSubmitted = false;
    this.isPasswordMatch = true;

    // init forms
    this.initForm();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void { }

  // #endregion

  // #region init forms

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.minLength(8)],
      password2: ['', Validators.required],
    });
  }

  // form controls
  get itemsFormControls() {
    return this.userForm.controls;
  }

  // #endregion

  // #region main actions

  createUser(model: UserRequestDto) {
    this.isSubmitted = true;
    if (this.userForm.valid && this.isPasswordMatch)
      this.userService.createUser(model).subscribe((res: ResponseDto) => {
        this.userForm.reset();
        this.dialogService.savedSuccessfully('User saved successfully!')
        this.isSubmitted = false;
      });
  }

  // #endregion

}
