// angular core
import { Component, OnInit, ViewChild } from '@angular/core';

// angular material
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

// components
import { AddReceiverComponent } from '../../receiver/add-receiver/add-receiver.component';

// constants
import { ListOfPersonTypes } from '../../shared/constants/list.constant';

// excel module
import * as XLSX from 'xlsx';

// model
import { ResponseDto } from '../../shared/models/api-response.model';

// services
import { ReceiverService } from '../../shared/services/receiver.service';
import { ListsService } from '../../shared/services/lists.service';
import { TranslateService } from '@ngx-translate/core';
import { DialogService } from '../../shared/services/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-receiver-list',
  templateUrl: './receiver-list.component.html',
  styleUrls: ['./receiver-list.component.scss']
})

export class ReceiverListComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  receiverDataSource: MatTableDataSource<any>;
  displayedColumns: string[];
  excelSheet: any;

  // name of lists
  listOfReceiverType: { label: string, value: string }[];
  listOfCountries: { code: string, desc_ar: string, desc_en: string }[];

  // #endregion

  // #region constructor

  constructor(
    private translateService: TranslateService,
    private listsService: ListsService,
    private receiverService: ReceiverService,
    public dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    // init variables
    this.listOfReceiverType = ListOfPersonTypes;
    this.listOfCountries = [];
    this.receiverDataSource = new MatTableDataSource();
    this.displayedColumns = ['id', 'code', 'name', 'type', 'reg_num', 'country', 'actions'];
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listCountries();
    this.listReceivers();
  }

  listCountries() {
    this.listsService.listCountries().subscribe((response: ResponseDto) => {
      this.listOfCountries = response.data;
    });
  }

  listReceivers() {
    this.receiverService.listReceivers().subscribe((res: ResponseDto) => this.receiverDataSource.data = res.data);
  }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.receiverDataSource.paginator = this.paginator;
    this.receiverDataSource.sort = this.sort;
  }

  // #endregion

  // #region main action

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.receiverDataSource.filter = filterValue.trim().toLowerCase();
    if (this.receiverDataSource.paginator) {
      this.receiverDataSource.paginator.firstPage();
    }
  }

  openReceiverPopup(id?: number) {
    const dialogRef = this.dialog.open(AddReceiverComponent, { data: { id } });
    dialogRef.afterClosed().subscribe(result => this.listReceivers());
  }

  getRecieverType(value: string): string {
    const type = this.listOfReceiverType.find((type) => type.value === value)?.label;
    return type || '';
  }

  getRecieverCountry(code: string): string {
    const country = this.listOfCountries.find(c => c.code === code);
    return (this.translateService.currentLang === 'en' ? country?.desc_en : country?.desc_ar) || '';
  }

  downloadExcelSheetTemplate() {
    const url = `${environment.templatesBaseUrl}Receiver-template.xlsx`;
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
      fileReader.readAsBinaryString(target.files[0]);
    }

  }

  getDataFromExcelSheet(bs: string): string[][] {
    const wb: XLSX.WorkBook = XLSX.read(bs, { type: "binary" });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    let receivers: string[][] = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
    receivers = receivers.filter(receiver => {
      let rcvr = [...receiver];
      rcvr = rcvr.filter(field => {
        return field && ((typeof field !== "string" && typeof field !== "undefined") || field.trim().length);
      })
      return rcvr.length > 1
    });
    return receivers;
  }

  handleSheetDataToSave(file: string[][]) {
    const fileHeader = file[0];
    file.shift();

    if (!this.isHeaderMatchTemplate(fileHeader)) this.dialogService.alertMessege("Template Titles should not change, make sure to work on uploaded template as it is.");
    else if (!this.checkAllFieldFilled(file)) this.dialogService.alertMessege("Please make sure to fill all field.");
    else {
      const recievers = file.map(reciever => {
        reciever[2] = this.listOfReceiverType.find(type => type.label === reciever[2])?.value || "";
        reciever[4] = this.listOfCountries.find(country => country.desc_ar === reciever[4])?.code || "";
        return reciever;
      });
      this.uploadReceiverExcelSheet(recievers);
    }
    this.excelSheet = null;
  }

  isHeaderMatchTemplate(headers: string[]): boolean {
    return headers.length >= 8 // check on header length
      && headers[0].includes("Code")
      && headers[1].includes("Name")
      && headers[2].includes("Type")
      && headers[3].includes("Registration Number")
      && headers[4].includes("Country")
      && headers[5].includes("Governate")
      && headers[6].includes("Region City")
      && headers[7].includes("Street")
      && headers[8].includes("Building Number")
      ;
  }

  checkAllFieldFilled(recievers: string[][]): boolean {
    let allFilled: boolean = true;
    recievers.forEach(reciever => {
      if (reciever.length < 8) allFilled = false;
    });
    return allFilled;
  }

  uploadReceiverExcelSheet(receivers: string[][]) {
    this.receiverService.uploadReceiverExcelSheet(receivers).subscribe((response: ResponseDto) => {
      this.dialogService.savedSuccessfully('Excel sheet has been uploaded successfully!');
      this.listReceivers();
    });
  }

  deleteReceiver(id: number) {
    this.dialogService.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        this.receiverService.deleteReceiver(id).subscribe((res: ResponseDto) => {
          this.dialogService.savedSuccessfully('Receiver Deleted successfully!');
          this.listReceivers();
        });
      }
    });
  }


  // #endregion

}

