// angular modules
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// models
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { UserRequestDto } from 'src/app/shared/models/user.model';
import { UserService } from 'src/app/shared/services/user.service';



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


  // #endregion

  // #region constructor

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    
    private route: ActivatedRoute
  ) { 

    this.userDetails = new UserRequestDto;
    this.isSubmitted = false;

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
      date_joined: ['', Validators.required],
      last_login: ['', Validators.required],
      issuer: ['', Validators.required],
    });
  }

  // form controls
  get itemsFormControls() {
    return this.userForm.controls;
  }

  // #endregion
  // #region main actions

  getUserById(){
    this.userService.getUserById(this.userId).subscribe((response:ResponseDto)=>{
      this.userDetails = response.data;
    })

  }

}
