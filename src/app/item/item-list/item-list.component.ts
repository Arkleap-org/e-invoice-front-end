import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  displayedColumns: string[] = ['number', 'name', 'description', 'type', 'code', 'internal_code', 'unit_type', 'actions'];

  // #endregion

  // #region constructor

  constructor(private itemService: ItemsService) {
    // init variables
    this.itemDataSource = new MatTableDataSource([{ name: "item 1" }, { name: "item 2" }]);
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void { }

  // #endregion

  // #region load table
  listItems() {

    this.itemService.listItems().subscribe((res: ListItemsResponseDto) => {






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

  // #endregion

}
