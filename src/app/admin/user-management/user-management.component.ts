// angular modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// models
import { ResponseDto } from '../../shared/models/api-response.model';
import { UserRequestDto } from '../../shared/models/user.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})

export class UserManagementComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  userDataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  // #endregion

  // #region constructor

  constructor(
    private userService: UserService,
    private dialogService: DialogService
  ) {

    // init variables
    this.userDataSource = new MatTableDataSource();
    this.displayedColumns = ['username', 'issuer', 'email', 'is_staff', 'is_superuser', 'is_active', 'date_joined',  'actions'];
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listUsers();
  }

  listUsers() {
    this.userService.listUsers().subscribe((response: ResponseDto) => this.userDataSource.data = response.data);
  }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.userDataSource.paginator = this.paginator;
    this.userDataSource.sort = this.sort;
  }

  // #endregion

  // #region main action

  deleteUser(user: UserRequestDto) {
    if (user.issuer) this.dialogService.alertMessege('User with issuer can\'t be deleted')
    else {
      this.dialogService.confirmDelete().then((result) => {
        if (result.isConfirmed) {
          this.userService.deleteUser(user.id).subscribe((response) => {
            this.dialogService.savedSuccessfully(user.username + 'deleted!')
            this.listUsers();
          });
        }
      });
    }
  }

  activateUser(user: UserRequestDto) {
    this.userService.activateUser(user.id).subscribe((response: ResponseDto) => {
      this.dialogService.savedSuccessfully(user.username + 'Activated')
      this.listUsers();
    });
  }

  deactivateUser(user: UserRequestDto) {
    this.userService.deactivateUser(user.id).subscribe((response: ResponseDto) => {
      this.dialogService.savedSuccessfully(user.username + 'Deactivated')
      this.listUsers();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();
    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

  // #endregion

}
