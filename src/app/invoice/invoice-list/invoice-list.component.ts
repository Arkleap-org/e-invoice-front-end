// angular core
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

// angular material
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// components
import { InvoiceCancelComponent } from '../../shared/popups/invoice-cancel/invoice-cancel.component';

// constants
import { ListOfDocumentTypes } from '../../shared/constants/list.constant';

// environments
import { environment } from '../../../environments/environment';

// models
import { ResponseDto } from '../../shared/models/api-response.model';
import { InvoiceDto } from '../../shared/models/invoice.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss'],
})
export class InvoiceListComponent implements OnInit {
  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  invoiceDataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  listOfDocumentTypes: { label: string; value: string }[];

  internal_id_list!: string[];
  isFirstSubmit: boolean;

  excelSheet: any;

  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  filterModel: FilterDto;

  // #endregion

  // #region constructor

  constructor(
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    public datepipe: DatePipe,
    public dialog: MatDialog,
    private loaderService: LoaderService
  ) {
    // init variables
    this.isFirstSubmit = true;
    this.invoiceDataSource = new MatTableDataSource();
    this.listOfDocumentTypes = ListOfDocumentTypes;
    this.displayedColumns = [
      'isSelected',
      'internal_id',
      'receiver_name',
      'date_time_issued',
      'total_amount',
      'invoice_status',
      'portal_status',
      'actions',
    ];
    this.filterModel = new FilterDto;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.listInvoices();
  }

  listInvoices() {
    this.invoiceService
      .listInvoices(this.currentPage + 1, this.pageSize, this.filterModel)
      .subscribe(
        (response: any) => {
          this.invoiceDataSource.data = response.data;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
            this.paginator.length = response.count;
          });
        }
      );
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
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

  submitInvoice(internalId: string) {
    this.invoiceService
      .submitInvoice(internalId)
      .subscribe((response: ResponseDto) => {
        this.dialogService.savedSuccessfully(
          'Your invoice is being Submitted...'
        );
        setTimeout(() => this.listInvoices(), 3000);
      });
  }

  openInvoiceCancelPopup(invoiceId: number, internal_id: number) {
    const dialogRef = this.dialog.open(InvoiceCancelComponent, {
      width: '40rem',
      data: {
        invoiceId,
        title: `Cancel Invoice #${internal_id}`,
        subTitle: 'Cancellation Reasons',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadControls();
    });
  }

  printInvoice(id: number) {
    this.invoiceService.printInvoice(id).subscribe((response: any) => {
      const fileURL = URL.createObjectURL(response);
      window.open(fileURL, '_blank');
    });
  }

  downloadExcelSheetTemplate() {
    const url = `${environment.templatesBaseUrl}Invoice-template.xlsx`;
    window.open(url, '_blank');
  }

  uploadExcelSheet(evt: any) {
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length === 1) {
      const fileReader: FileReader = new FileReader();
      // handle on load file
      fileReader.onload = (e: any) => {
        // get data from excel sheet
        const file: string[][] = this.getDataFromExcelSheet(e.target.result);

        // validate data to save
        this.handleSheetDataToSave(file);
      };
      fileReader.readAsBinaryString(target.files[0]);
    }
  }

  getDataFromExcelSheet(bs: string): string[][] {
    const wb: XLSX.WorkBook = XLSX.read(bs, { type: 'binary' });
    const wsname: string = wb.SheetNames[0];
    const ws: XLSX.WorkSheet = wb.Sheets[wsname];
    let invoices: string[][] = XLSX.utils.sheet_to_json(ws, { header: 1 });
    invoices = invoices.filter((invoice) => {
      let inv = [...invoice];
      inv = inv.filter((field) => {
        return (
          field &&
          ((typeof field !== 'string' && typeof field !== 'undefined') ||
            field.trim().length)
        );
      });
      return inv.length > 1;
    });
    return invoices;
  }

  handleSheetDataToSave(invoices: string[][]) {
    const fileHeader = invoices[0];
    invoices.shift();

    if (!this.isHeaderMatchTemplate(fileHeader))
      this.dialogService.alertMessege(
        'Template Titles should not change, make sure to work on uploaded template as it is.'
      );
    else if (!this.checkAllFieldFilled(invoices))
      this.dialogService.alertMessege('Please make sure to fill all field.');
    else {
      this.uploadInvoiceExcelSheet(invoices);
    }
    this.excelSheet = null;
  }

  isHeaderMatchTemplate(headers: string[]): boolean {
    return (
      headers.length === 10 && // check on header length
      headers[0].includes('Invoice Id') &&
      headers[1].includes('Invoice Date') &&
      headers[2].includes('Customer Internal code') &&
      headers[3].includes('Item Internal Code') &&
      headers[4].includes('Quantity') &&
      headers[5].includes('Unit Price') &&
      headers[6].includes('Document Type') &&
      headers[7].includes('Items Discount') &&
      headers[8].includes('Items Discount Rate') &&
      headers[9].includes('Invoice Version')
    );
  }

  checkAllFieldFilled(items: string[][]): boolean {
    let allFilled: boolean = true;
    items.forEach((item) => {
      if (item.length < 7) allFilled = false;
    });
    return allFilled;
  }

  uploadInvoiceExcelSheet(invoices: string[][]) {
    let invalidDate: boolean = false;

    let hasInvalidDateFormate = false;
    for (let i = 0; i < invoices.length; i++) {
      // check if formate is mm/dd/yyyy
      if (Number(invoices[i][1].split('/')[0]) > 11) {
        this.dialogService.alertMessege('Date Issued should has the formate: MM/DD/YYYY ');
        hasInvalidDateFormate = true;
        break;
      }
    }
    if (hasInvalidDateFormate) return;

    invoices = invoices.map((invoice) => {
      let today = new Date();
      const dt = new Date(invoice[1]);
      if (dt > today) {
        invalidDate = true;
      }
      invoice[1] = this.datepipe.transform(dt, 'yyyy-MM-dd hh:mm:ss') || '';
      invoice[6] =
        this.listOfDocumentTypes.find((type) => type.label === invoice[6])
          ?.value || '';
      return invoice;
    });
    if (invalidDate) {
      this.dialogService.alertMessege(
        'Date Time Issued cannot be in the future!'
      );
      return;
    }
    this.invoiceService.uploadInvoiceExcelSheet(invoices).subscribe((res) => {
      this.dialogService.savedSuccessfully(
        'Excel sheet has been uploaded successfully!'
      );
      this.listInvoices();
    });
  }

  getInvoiceSubmission(invoiceId: number) {
    this.invoiceService
      .getInvoiceSubmission(invoiceId)
      .subscribe((res: ResponseDto) => this.listInvoices());
  }

  hasSelectedInvoices(): boolean {
    const list: InvoiceDto[] = this.invoiceDataSource.data;
    return list.findIndex((invoice) => invoice.isSelected === true) > -1;
  }

  deleteSelectedInvoices() {
    if (this.hasSelectedInvoices()) {
      if (this.isAllSelectedInvoicesDraft()) {
        const ids: number[] = this.invoiceDataSource.data.filter((invoice) => invoice.isSelected === true).map((invoice) => { return invoice.id; });
        this.deleteInvoices(ids);
      }
      else this.dialogService.alertMessege('Only Draft Invoice can be deleted.');
    }
    else this.dialogService.alertMessege('Please Select Invoices to be deleted.');
  }

  deleteInvoices(ids: number[]) {
    this.invoiceService.deleteInvoices(ids).subscribe((res: ResponseDto) => {
      this.dialogService.savedSuccessfully("Deleted Successfully");
      this.listInvoices();
    });
  }

  isAllSelectedInvoicesDraft() {
    const list: InvoiceDto[] = this.invoiceDataSource.data.filter(
      (invoice) => invoice.invoice_status != 'Draft' && invoice.isSelected === true
    );
    return list.length === 0;
  }

  SubmitSelectedInvoices() {
    if (this.hasSelectedInvoices()) {
      this.internal_id_list = this.invoiceDataSource.data
        .filter((invoice) => invoice.isSelected === true)
        .map((invoice) => {
          return invoice.internal_id;
        });
      this.recursive();
    }
    else this.dialogService.alertMessege('Please Select Invoices to be submitted.');
  }

  recursive() {
    if (this.internal_id_list.length) {
      setTimeout(
        () => {
          this.invoiceService
            .submitInvoice(this.internal_id_list[0])
            .subscribe((response: ResponseDto) => {
              this.internal_id_list.shift();
              this.isFirstSubmit = false;
              this.recursive();
            })
            .add(() => {
              this.loaderService.isLoading.next(true);
            });
        },
        this.isFirstSubmit ? 0 : 3000
      );
    } else {
      this.isFirstSubmit = true;
      this.dialogService.savedSuccessfully(
        'Your invoices are being Submitted...'
      );
      this.listInvoices();
    }
  }

  // #endregion
}

export class FilterDto {
  receiver_name!: string;
  internal_id!: number;
  total_amount_from!: number;
  total_amount_to!: number;
  date_time_from!: string;
  date_time_to!: string;
}
