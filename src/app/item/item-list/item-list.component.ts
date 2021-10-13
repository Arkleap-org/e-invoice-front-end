import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})

export class ItemListComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  itemDataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  // #endregion

  // #region constructor

  constructor() {
    // init variables
    this.itemDataSource = new MatTableDataSource();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void { }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.itemDataSource.paginator = this.paginator;
    this.itemDataSource.sort = this.sort;
  }

  // #endregion

  // #region main action

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.itemDataSource.filter = filterValue.trim().toLowerCase();

    if (this.itemDataSource.paginator) {
      this.itemDataSource.paginator.firstPage();
    }
  }

  // #endregion

}
