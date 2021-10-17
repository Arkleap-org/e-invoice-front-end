import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { InvoiceService } from 'src/app/shared/services/invoice.service';


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
    private invoiceService: InvoiceService
  ) {
    // init variables
    this.invoiceDataSource = new MatTableDataSource();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.listInvoices();
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

  // get invoices list
  listInvoices() {
    this.invoiceService.listInvoices()
      .subscribe(
        (response: ResponseDto) => {
          console.log('invoices list ', response);
          this.invoiceDataSource.data = response.data;
        }
      );
  }


  // #endregion

}
