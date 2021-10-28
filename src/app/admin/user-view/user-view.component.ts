// angular modules
import { Component, OnInit } from '@angular/core';
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

  // #endregion

  // #region constructor

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) { 

    this.userDetails = new UserRequestDto
  }

  // #endregion

  // #region ngOnit

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["id"]
    this.getUserById();
  }
  // #endregion

  // #region main actions

  getUserById(){
    this.userService.getUserById(this.userId).subscribe((response:ResponseDto)=>{
      this.userDetails = response.data;
    })

  }

}
