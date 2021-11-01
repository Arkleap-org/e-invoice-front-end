import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { ListItemsResponseDto } from 'src/app/shared/models/items.model';
import { ItemsService } from 'src/app/shared/services/items.service';


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
  displayedColumns: string[] = ['id', 'item_name', 'item_desc', 'item_type', 'item_code', 'internal_code', 'unit_type', 'actions'];
  pageSizeOptions: number[] = [10];

  // #endregion

  // #region constructor

  constructor(private itemService: ItemsService) {
    // init variables
    this.itemDataSource = new MatTableDataSource();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {

    this.listItems();
  }

  // #endregion

  // #region load table
  listItems() {

    this.itemService.listItems().subscribe((res: ResponseDto) => {

      this.itemDataSource = res.data;




    });
  }





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
// debugging 
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  // #endregion

}
