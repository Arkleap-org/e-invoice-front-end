import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../../shared/services/admin.service';
import { ResponseDto } from '../../../shared/models/api-response.model';
import { DialogService } from '../../../shared/services/dialog.service';

@Component({
  selector: 'app-subscription-list',
  templateUrl: './subscription-list.component.html',
  styleUrls: ['./subscription-list.component.scss']
})
export class SubscriptionListComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[];
  planDataSource: MatTableDataSource<any>;

  // #endregion

  // #region constructor

  constructor(
    private adminService: AdminService,
    private dialogService: DialogService,
    public dialog: MatDialog,
  ) {
    // init variables
    this.displayedColumns = ['index', 'issuer_name', 'plan_name', 'start_date', 'end_date', 'is_active', 'is_paid', 'action'];
    this.planDataSource = new MatTableDataSource();
  }

  // #endergion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.getListOfSubscriptions();
  }

  getListOfSubscriptions() {
    this.adminService.getListOfSubscriptions().subscribe((res: ResponseDto) => this.planDataSource.data = res.data);
  }

  // #endregion

  // #region main actions

  updateSubscription(row: SubscriptionListDto) {
    this.adminService.updateSubscription(row).subscribe(() => {
      this.dialogService.savedSuccessfully("Subscription has been updated successfully");
      this.getListOfSubscriptions();
    });

  }

  // #endregion

}

export interface SubscriptionListDto {
  id: number;
  issuer_name: number;
  plan_name: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_paid: boolean;
  isRowChanged: boolean;
}
