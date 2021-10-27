import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { UserRequestDto } from 'src/app/shared/models/user.model';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { UserService } from 'src/app/shared/services/user.service';

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
  displayedColumns: string[] = ['username', 'issuer', 'email', 'is_staff', 'is_superuser',
    'is_active', 'date_joined', 'last_login', 'actions'];

  // #endregion
  constructor(private userService: UserService,
    private dialogService:DialogService) {

    // init variables
    this.userDataSource = new MatTableDataSource();

  }

  ngOnInit(): void {

    this.listUsers();
  }



  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.userDataSource.paginator = this.paginator;
    this.userDataSource.sort = this.sort;
  }

  // #endregion

  // #region main action

  // list users

  listUsers() {
    this.userService.listUsers().subscribe((response: ResponseDto) => this.userDataSource.data = response.data);
  }

  // delete user

  async deleteUser(user:UserRequestDto){

    const confirmDeleteAction = await this.dialogService.confirmDelete('delete user'+user.username);

    if(confirmDeleteAction.isConfirmed) {
      this.userService.deleteUser(user.id).subscribe((response) => 
      {
        this.dialogService.savedSuccessfully(user.username+'deleted!')
        this.listUsers();
      });
    }

  }

  // activate user 

  activateUser(user:UserRequestDto){
    this.userService.activateUser(user.id).subscribe((response:ResponseDto)=>{
      this.dialogService.savedSuccessfully(user.username+'Activated')
      this.listUsers();
    })
  }

  // deactivate user

  deactivateUser(user:UserRequestDto){
    this.userService.deactivateUser(user.id).subscribe((response:ResponseDto)=>{
      this.dialogService.savedSuccessfully(user.username+'Deactivated')
      this.listUsers();
    })
  }
  // filter table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();
    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

  // #endregion

}
