import { Component, OnInit, ViewChild } from '@angular/core';

import { TdPagingBarComponent, IPageChangeEvent } from '@covalent/core/paging';
import { ITdDataTableColumn, TdDataTableSortingOrder, TdDataTableService, ITdDataTableSortChangeEvent } from '@covalent/core/data-table';
// import { TdDialogService } from '@covalent/core/dialogs';

// const DECIMAL_FORMAT: (v: any) => any = (v: number) => v.toFixed(2);

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  // @ViewChild(TdPagingBarComponent, { static: true }) pagingBar: TdPagingBarComponent;

  columns: ITdDataTableColumn[] = [
    { name: 'first_name', label: 'First Name', sortable: true, filter: false, width: 150 },
    { name: 'last_name', label: 'Last Name', sortable: false },
    { name: 'email', label: 'Email', sortable: true, width: 250 },
    { name: 'balance', label: 'Balance', numeric: true },
  ];

  data: any[] = [];
  basicData: any[] = [];
  selectable: boolean = true;
  clickable: boolean = false;
  multiple: boolean = true;
  resizableColumns: boolean = false;

  filteredData: any[] = [];
  filteredTotal: number = 0;
  selectedRows: any[] = [];

  filterTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'first_name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(
    private _dataTableService: TdDataTableService,
    // private _dialogService: TdDialogService
  ) { }

  ngOnInit(): void {
    this.data = [
      { sku: '1452-2', item: 'Pork Chops', price: 32.11 },
      { sku: '1421-0', item: 'Prime Rib', price: 41.15 },
    ];
    // private columns: ITdDataTableColumn[] = [
    //   { name: 'sku', label: 'SKU #', tooltip: 'Stock Keeping Unit', sortable: true },
    //   { name: 'item', label: 'Item name', width: 200 },
    //   { name: 'price', label: 'Price (US$)', numeric: true, format: v => v.toFixed(2), width: { min: 100, max: 400 } },
    // ];
    this.basicData = this.data.slice(0, 10);
    this.refreshTable();
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.refreshTable();
  }

  filter(filterTerm: string): void {
    this.filterTerm = filterTerm;
    // this.pagingBar.navigateToPage(1);
    this.refreshTable();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.refreshTable();
  }

  refreshTable(): void {
    let newData: any[] = this.data;
    const excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return (
          (column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false)
        );
      })
      .map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(newData, this.filterTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  showAlert(event: any): void {
    // this._dialogService.openAlert({
    //   message: 'You clicked on row: ' + event.row.first_name + ' ' + event.row.last_name,
    // });
  }

}
