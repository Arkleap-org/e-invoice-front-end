// angular core
import { Component, OnInit, ViewChild } from '@angular/core';

// angular material
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// components
import { InvoiceCancelComponent } from '../../popups/invoice/invoice-cancel/invoice-cancel.component';

// models
import { ResponseDto } from '../../shared/models/api-response.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { InvoiceService } from '../../shared/services/invoice.service';


@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})
export class InvoiceListComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  invoiceDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['number', 'internal_id', 'receiver_name', 'date_time_issued',
    'total_amount', 'invoice_status', 'portal_status', 'actions'];

  // #endregion

  // #region constructor

  constructor(
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    public dialog: MatDialog,
  ) {
    // init variables
    this.invoiceDataSource = new MatTableDataSource();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listInvoices();
  }

  // get invoices list
  listInvoices() {
    this.invoiceService.listInvoices().subscribe((response: ResponseDto) => this.invoiceDataSource.data = response.data);
  }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.invoiceDataSource.paginator = this.paginator;
    this.invoiceDataSource.sort = this.sort;
  }

  // #endregion

  // #region main action

  // filter table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invoiceDataSource.filter = filterValue.trim().toLowerCase();

    if (this.invoiceDataSource.paginator) {
      this.invoiceDataSource.paginator.firstPage();
    }
  }

  submitInvoice(internalId: string) {
    this.invoiceService.submitInvoice(internalId).subscribe((response: ResponseDto) => {
      this.dialogService.savedSuccessfully('Your invoice is beeing Submitted...');
      console.log('sub response ', response);

    });
  }

  openInvoiceCancelPopup(invoiceId: number) {
    const dialogRef = this.dialog.open(InvoiceCancelComponent, {
      width: '40rem',
      data: invoiceId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadControls();
    });
  }

  // #endregion

}
