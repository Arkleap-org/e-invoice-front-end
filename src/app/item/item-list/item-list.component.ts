// angular modules
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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

  listOfUnitTypes: ActivityCodeDto[];
  listOfTaxTypes: { code: string, desc_ar: string, desc_en: string, taxtype_reference: string }[];

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
    this.itemService.listItems().subscribe((res: ResponseDto) => {
      this.itemDataSource.data = res.data;
    });
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

  uploadExcelSheet(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length === 1) {
      const fileReader: FileReader = new FileReader();
      fileReader.onload = (e: any) => {
        const bs: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bs, { type: "binary" });
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let file: string[][] = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

        const fileHeader = file[0];
        file.shift();
        file = file.filter(item => {
          item = item.filter(field => { return field })
          return item.length === 8;
        })
        const items = file.map(item => {
          item[5] = this.listOfUnitTypes.find(type => type.desc_en === item[5])?.code || "";
          item[6] = this.listOfTaxTypes.find(type => type.desc_ar === item[6])?.code || "";
          return item;
        })
        console.log(items);
        // if (!this.isHeaderMatchTemplate(fileHeader)) this.dialogService.alertMessege("Template Titles should not change, make sure to work on uploaded template as it is.")
        // else
        this.uploadItemExcelSheet(items)
      }
      fileReader.readAsBinaryString(target.files[0])
    }

  }

  isHeaderMatchTemplate(headers: string[]): boolean {
    return headers.length === 8 // check on header length
      && headers[0].includes("Item Name")
      && headers[1].includes("Item Description")
      && headers[2].includes("Item Type")
      && headers[3].includes("Item Code")
      && headers[4].includes("Internal Code")
      && headers[5].includes("Unit Type")
      && headers[6].includes("Tax Type")
      && headers[7].includes("Tax Rate")
      ;
  }

  uploadItemExcelSheet(items: string[][]) {
    this.itemService.uploadItemExcelSheet(items).subscribe((res) => {
      this.dialogService.savedSuccessfully('Excel sheet has been uploaded successfully!');
      this.listItems();
    })
  }

  // #endregion

}
