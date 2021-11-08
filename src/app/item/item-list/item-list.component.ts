// angular modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// models
import { ResponseDto } from '../../shared/models/api-response.model';

// services
import { ItemsService } from '../../shared/services/items.service';

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
  displayedColumns: string[];

  // #endregion

  // #region constructor

  constructor(private itemService: ItemsService) {

    // init variables
    this.itemDataSource = new MatTableDataSource();
    this.displayedColumns = ['id', 'item_name', 'item_desc', 'item_type', 'item_code', 'internal_code', 'unit_type', 'actions'];
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.itemDataSource.paginator = this.paginator;
    this.itemDataSource.sort = this.sort;
  }

  // #endregion

  // #region load table

  loadControls() {
    this.listItems();
  }

  listItems() {
    this.itemService.listItems().subscribe((res: ResponseDto) => {
      this.itemDataSource.data = res.data;
    });
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

  downloadExcelSheetTemplate() {
    const url = '';
    window.open(url, "_blank");
  }

  uploadExcelSheet() {

  }

  // #endregion

}
