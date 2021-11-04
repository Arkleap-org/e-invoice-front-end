// angular core
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// models
import { ResponseDto } from '../shared/models/api-response.model';
import { DashboardDto } from '../shared/models/dashboard.model';
import { InvoiceCancelComponent } from '../shared/popups/invoice-cancel/invoice-cancel.component';

// services
import { DashboardService } from '../shared/services/dashboard.service';
import { InvoiceService } from '../shared/services/invoice.service';
import { SecurityService } from '../shared/services/security.service';

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
  displayedColumns: string[];
  dashboardCounts: DashboardDto;
  thisMonth: number;
  currentIssuer: string;


  // #endregion

  // #region constructor

  constructor(
    private dashboardService: DashboardService,
    private securityService: SecurityService,
    private invoiceService: InvoiceService,
    public dialog: MatDialog,
  ) {
    // init variables
    this.invoiceDataSource = new MatTableDataSource();
    this.dashboardCounts = new DashboardDto;
    this.thisMonth = Date.now();
    this.displayedColumns = ['issuerName', 'receiverName', 'documentTypeNamePrimaryLang', 'dateTimeIssued', 'dateTimeReceived', 'total', 'actions'];
    this.currentIssuer = this.securityService.user?.reg_num || "";
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
    this.dashboardService.getCounts().subscribe((response: ResponseDto) => this.dashboardCounts = response.data);
  }

  listRecentInvoices() {
    this.dashboardService.listRecentInvoices().subscribe((response: ResponseDto) => this.invoiceDataSource.data = response.data);
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

  openInvoiceCancelPopup(invoiceId: number, internalId: number) {
    const dialogRef = this.dialog.open(InvoiceCancelComponent, {
      width: '40rem',
      data: {
        invoiceId,
        title: `Reject Invoice #${internalId}`,
        subTitle: 'Rejection Reasons'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadControls();
    });
  }

  openInvoice(url: string) {
    window.open(url, "_blank")
  }

  getRecentInvoices() {
    this.dashboardService.getRecentInvoices().subscribe((res) => {
      this.listRecentInvoices();
    });
  }

  // #endregion

}
