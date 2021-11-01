// angular modules
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// models
import { ResponseDto } from '../../shared/models/api-response.model';
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

  // #endregion

  // #region constructor

  constructor(
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    // init variables
    this.userDetails = new UserRequestDto
  }

  // #endregion

  // #region ngOnit

  ngOnInit(): void {
    this.userId = this.route.snapshot.params["id"]
    this.loadControls();
  }
  // #endregion

  // #region load controls

  loadControls() {
    this.getUserById(this.userId);
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe((response: ResponseDto) => {
      this.userDetails = response.data;
    });
  }

  // #endregion

}
