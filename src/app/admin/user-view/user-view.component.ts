// angular modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// models
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { DialogService } from 'src/app/shared/services/dialog.service';

import { UserRequestDto } from '../../shared/models/user.model';

// services
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})

export class UserViewComponent implements OnInit {

  // #region declare variables

  userId!: number;
  userDetails!: UserRequestDto;
  userForm!: FormGroup;
  isSubmitted: boolean;
  updateView: boolean;


  // #endregion

  // #region constructor

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router
  ) {

    this.userDetails = new UserRequestDto;
    this.isSubmitted = false;
    this.updateView = false;

  }

  // #endregion

  // #region ngOnit

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["id"]
    this.getUserById();
    this.initForm();
  }
  // #endregion
  // #region init forms

  initForm() {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      is_staff: ['', Validators.required],
      is_superuser: ['', Validators.required],
      is_active: ['', Validators.required],
      date_joined: ['',],
      last_login: ['',],
      issuer: [''],
    });
  }

  // form controls
  get itemsFormControls() {
    return this.userForm.controls;
  }

  // #endregion
  // #region main actions

  updateUserView() {
    this.updateView = true;
  }

  updateUser(model: UserRequestDto) {
    this.isSubmitted = true;
    if (this.userForm.valid) {
      this.userService.updateUser(this.userDetails.id, model).subscribe((response: ResponseDto) => {
        this.router.navigate(['/user/list']);
        this.dialogService.savedSuccessfully(this.userDetails.username + ' has been updated successfully.');
      });
    }
  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe((response: ResponseDto) => {
      this.userDetails = response.data;
    })
  }



  // #endregion

}
