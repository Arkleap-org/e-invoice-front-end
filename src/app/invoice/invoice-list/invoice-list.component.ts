import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs/operators';
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
  displayedColumns: string[] = ['number', 'name', 'description', 'type', 'code', 'internal_code', 'unit_type', 'actions'];

  // #endregion

  // #region constructor

  constructor(
    private invoiceService: InvoiceService
  ) {
    // init variables
    this.invoiceDataSource = new MatTableDataSource([{ name: "invoice 1" }, { name: "invoice 2" }]);
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
        (response) => {
          console.log('invoices list ', response);

        }
      );
  }


  // #endregion

}
