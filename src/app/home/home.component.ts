// angular core
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// models
import { ResponseDto } from '../shared/models/api-response.model';
import { DashboardDto } from '../shared/models/dashboard.model';

// services
import { DashboardService } from '../shared/services/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  // #region declare variable

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  invoiceDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['issuerName', 'receiverName', 'documentTypeNamePrimaryLang', 'dateTimeIssued', 'dateTimeReceived', 'total', 'actions'];
  dashboardCounts: DashboardDto;

  // #endregion

  // #region constructor

  constructor(
    private dashboardService: DashboardService
  ) {
    // init variables
    this.invoiceDataSource = new MatTableDataSource();
    this.dashboardCounts = new DashboardDto;
  }

  // #endregion


  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls()
  }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.invoiceDataSource.paginator = this.paginator;
    this.invoiceDataSource.sort = this.sort;
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.getIssuer()
    this.listRecentInvoices()
  }

  getIssuer() {
    this.dashboardService.getCounts().subscribe((response: ResponseDto) => {
      this.dashboardCounts = response.data;
    });
  }

  listRecentInvoices() {
    this.dashboardService.listRecentInvoices().subscribe((response: ResponseDto) => {
      this.invoiceDataSource.data = response.data;
    });
  }

  // #endregion

  // #region main actions

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invoiceDataSource.filter = filterValue.trim().toLowerCase();

    if (this.invoiceDataSource.paginator) {
      this.invoiceDataSource.paginator.firstPage();
    }
  }

  // #endregion

}
