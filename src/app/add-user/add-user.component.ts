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
      email: ['', Validators.required],
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
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

    if (this.userForm.value.password === this.userForm.value.password2) {
      if (this.userForm.valid)
        this.userService.createUser(model).subscribe((res: ResponseDto) => {
          this.userForm.reset();
          this.dialogService.savedSuccessfully('User saved successfully!')
          this.isSubmitted = false;
        });
    }
    else this.isPasswordMatch = false;
  }

  // #endregion

}
