// angular core
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];


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
    this.displayedColumns = ['issuerName', 'receiverName', 'documentTypeNamePrimaryLang', 'status', 'dateTimeIssued', 'dateTimeReceived', 'total', 'actions'];
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
    this.dashboardService.listRecentInvoices(this.currentPage + 1, this.pageSize).subscribe((response: RecentInvoicesDto) => {
      this.invoiceDataSource.data = response.result;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = response.metadata.totalCount;
      });
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.listRecentInvoices();
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

  // #endregion

}

export class RecentInvoicesDto {
  metadata!: MetaDataDto;
  result!: any[];
}

export class MetaDataDto {
  totalCount!: number
  totalPages!: number
}
