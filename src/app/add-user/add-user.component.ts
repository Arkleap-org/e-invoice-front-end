// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../shared/services/dialog.service';

// reactive form

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

//services 
import { ItemsService } from 'src/app/shared/services/items.service';

// sweetalert
import Swal from 'sweetalert2';
import { CreateItemRequestDto, CreateItemResponseDto } from 'src/app/shared/models/items.model';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { UserRequestDto } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  model: UserRequestDto;
  isSubmitted: boolean;
  userForm!: FormGroup;
  isPasswordMatch: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogService: DialogService,



  ) {

    this.model = new UserRequestDto;
    this.isSubmitted = false;
    this.initForm();
    this.isPasswordMatch = true;


  }

  ngOnInit(): void {
  }

  // #region init forms

  initForm() {

    this.userForm = this.formBuilder.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],

    });

  }

  // form controls
  get itemsFormControls() {
    return this.userForm.controls;
  }

  // #endregion

  // #region form actions


  createUser(model: UserRequestDto) {

    this.isSubmitted = true;
    console.log('create user function')

    if (this.userForm.value.password === this.userForm.value.password2) {
      if (this.userForm.valid)
        this.userService.createUser(model).subscribe((res: ResponseDto) => {
          this.userForm.reset();
          this.dialogService.savedSuccessfully('User saved successfully!')
          this.isSubmitted = false;
        });


    }
    else {
      this.isPasswordMatch = false;
    }



  }
  // #endregion

}
