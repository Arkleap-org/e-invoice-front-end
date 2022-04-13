import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from '../../../shared/services/admin.service';

@Component({
  selector: 'app-plan-list',
  templateUrl: './plan-list.component.html',
  styleUrls: ['./plan-list.component.scss']
})
export class PlanListComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[];
  planDataSource: MatTableDataSource<any>;

  // #endregion

  // #region constructor

  constructor(
    private adminService: AdminService,
  ) {
    // init variables
    this.displayedColumns = ['index', 'name', 'description', 'price', 'type', 'is_active', 'action'];
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
    this.getListOfPlans();
  }

  getListOfPlans() {
    this.adminService.getListOfPlans().subscribe((res: PlanDto[]) => this.planDataSource.data = res);
  }

  // #endregion

  // #region main actions


  // #endregion

}

export class PlanDto {
  id!: number
  name!: string;
  description!: string;
  type!: string;
  price!: string;
  is_active!: boolean;
}
