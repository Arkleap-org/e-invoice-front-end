// angular core
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['issuer', 'receiver', 'type', 'date_issued', 'date_received', 'total', 'actions'];

  // #endregion

  // #region constructor

  constructor() {
    // init variables
    this.invoiceDataSource = new MatTableDataSource([
      { issuer: "issuer 1", receiver: "receiver 1", type: "Invoice", total: 50000 },
      { issuer: "issuer 2" }]);
  }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.invoiceDataSource.paginator = this.paginator;
    this.invoiceDataSource.sort = this.sort;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
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
