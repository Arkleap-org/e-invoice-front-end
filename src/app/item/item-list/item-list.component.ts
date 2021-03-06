// angular modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// excel module
import * as XLSX from 'xlsx';

// models
import { ResponseDto } from '../../shared/models/api-response.model';
import { ActivityCodeDto } from '../../shared/models/activity-code.model';

// services
import { ItemsService } from '../../shared/services/items.service';
import { DialogService } from '../../shared/services/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})

export class ItemListComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  excelSheet: any;

  itemDataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  listOfUnitTypes: ActivityCodeDto[];
  listOfTaxTypes: { code: string, desc_ar: string, desc_en: string, taxtype_reference: string }[];

  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  filterModel: FilterDto;

  // #endregion

  // #region constructor

  constructor(
    private itemService: ItemsService,
    private dialogService: DialogService,
  ) {

    // init variables
    this.itemDataSource = new MatTableDataSource();
    this.listOfUnitTypes = this.listOfTaxTypes = [];
    this.displayedColumns = ['id', 'item_name', 'item_desc', 'item_type', 'item_code', 'internal_code', 'unit_type', 'actions'];
    this.filterModel = new FilterDto;
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
    this.listUnitTypes();
    this.listTaxTypes();
  }

  listItems() {
    this.itemService.listItems(this.currentPage + 1, this.pageSize, this.filterModel).subscribe((res: ResponseDto) => {
      this.itemDataSource.data = res.data;
      setTimeout(() => {
        this.paginator.pageIndex = this.currentPage;
        this.paginator.length = res.count;
      });
    });
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.listItems();
  }

  listUnitTypes() {
    this.itemService.listUnitTypes().subscribe((res: ResponseDto) => {
      this.listOfUnitTypes = res.data;
    })
  }

  listTaxTypes() {
    this.itemService.listTaxTypes().subscribe((res: ResponseDto) => {
      this.listOfTaxTypes = res.data;
    })
  }

  // #endregion

  // #region main action

  getIndexOfRow(id: number): number {
    const index = this.itemDataSource.data.findIndex(item => item.id === id) + 1;
    return index;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.itemDataSource.filter = filterValue.trim().toLowerCase();
    if (this.itemDataSource.paginator) {
      this.itemDataSource.paginator.firstPage();
    }
  }

  downloadExcelSheetTemplate() {
    const url = `${environment.templatesBaseUrl}ItemService-template.xlsx`;
    window.open(url, "_blank");
  }

  uploadExcelSheet(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length === 1) {
      const fileReader: FileReader = new FileReader();
      // handle on load file
      fileReader.onload = (e: any) => {

        // get data from excel sheet
        const file: string[][] = this.getDataFromExcelSheet(e.target.result);

        // validate data to save
        this.handleSheetDataToSave(file);

      }
      fileReader.readAsBinaryString(target.files[0])
    }

  }

  getDataFromExcelSheet(bs: string): string[][] {
    const wb: XLSX.WorkBook = XLSX.read(bs, { type: "binary" });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    let items: string[][] = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    items = items.filter(item => {
      let itm = [...item];
      itm = itm.filter(field => {
        return field && ((typeof field !== "string" && typeof field !== "undefined") || field.trim().length);
      })
      return itm.length > 1
    });
    return items;
  }

  handleSheetDataToSave(file: string[][]) {
    const fileHeader = file[0];
    file.shift();

    if (!this.isHeaderMatchTemplate(fileHeader)) this.dialogService.alertMessege("Template Titles should not change, make sure to work on uploaded template as it is.");
    else if (!this.checkAllFieldFilled(file)) this.dialogService.alertMessege("Please make sure to fill all field.");
    else {
      const items = file.map(item => {
        item[5] = this.listOfUnitTypes.find(type => type.desc_en === item[5])?.code || "";
        item[6] = this.listOfTaxTypes.find(type => type.desc_ar === item[6])?.code || "";
        // if (item[8]) item[8] = this.listOfTaxTypes.find(type => type.desc_ar === item[8])?.code || "";
        return item;
      });
      this.uploadItemExcelSheet(items);
    }
    this.excelSheet = null;
  }

  isHeaderMatchTemplate(headers: string[]): boolean {
    return headers.length >= 6 // check on header length
      && headers[0].includes("Item Name")
      && headers[1].includes("Item Description")
      && headers[2].includes("Item Code Type")
      && headers[3].includes("Item Code")
      && headers[4].includes("Internal Code")
      && headers[5].includes("Unit Type")
      && headers[6].includes("Tax Type1")
      && headers[7].includes("Tax Rate1")
      // && headers[8].includes("Tax Type2")
      // && headers[9].includes("Tax Rate2")
      ;
  }

  checkAllFieldFilled(items: string[][]): boolean {
    let allFilled: boolean = true;
    items.forEach(item => {
      if (item.length < 6) allFilled = false;
    });
    return allFilled;
  }

  uploadItemExcelSheet(items: string[][]) {
    this.itemService.uploadItemExcelSheet(items).subscribe((res) => {
      this.dialogService.savedSuccessfully('Excel sheet has been uploaded successfully!');
      this.listItems();
    })
  }

  deleteItem(id: number) {
    this.dialogService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        this.itemService.deleteItem(id).subscribe((res: ResponseDto) => {
          this.dialogService.savedSuccessfully('Item Deleted successfully!');
          this.listItems();
        });
      }
    });
  }

  // #endregion

}

export class FilterDto {
  item_name!: string;
  item_code!: string;
  internal_code!: string;
}
