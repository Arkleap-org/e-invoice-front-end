// angular core
import { Component, OnInit, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';

// angular material
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// components
import { InvoiceCancelComponent } from '../../shared/popups/invoice-cancel/invoice-cancel.component';

// models
import { ResponseDto } from '../../shared/models/api-response.model';

// services
import { DialogService } from '../../shared/services/dialog.service';
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})

export class InvoiceListComponent implements OnInit {

  // #region declare variables

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  invoiceDataSource: MatTableDataSource<any>;
  displayedColumns: string[];

  // #endregion

  // #region constructor

  constructor(
    private invoiceService: InvoiceService,
    private dialogService: DialogService,
    public dialog: MatDialog,
  ) {
    // init variables
    this.invoiceDataSource = new MatTableDataSource();
    this.displayedColumns = ['number', 'internal_id', 'receiver_name', 'date_time_issued', 'total_amount', 'invoice_status', 'portal_status', 'actions'];
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

  // get invoices list
  listInvoices() {
    this.invoiceService.listInvoices().subscribe((response: ResponseDto) => this.invoiceDataSource.data = response.data);
  }

  // #endregion

  // #region ngAfterViewInit

  ngAfterViewInit() {
    this.invoiceDataSource.paginator = this.paginator;
    this.invoiceDataSource.sort = this.sort;
  }

  // #endregion

  // #region main action

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.invoiceDataSource.filter = filterValue.trim().toLowerCase();

    if (this.invoiceDataSource.paginator) {
      this.invoiceDataSource.paginator.firstPage();
    }
  }

  submitInvoice(internalId: string) {
    this.invoiceService.submitInvoice(internalId).subscribe((response: ResponseDto) => {
      this.dialogService.savedSuccessfully('Your invoice is beeing Submitted...');
    });
  }

  openInvoiceCancelPopup(invoiceId: number, internal_id: number) {
    const dialogRef = this.dialog.open(InvoiceCancelComponent, {
      width: '40rem',
      data: {
        invoiceId,
        title: `Cancel Invoice #${internal_id}`,
        subTitle: 'Cancellation Reasons'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
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
        const file = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        console.log(file);

        // const fileHeader = file[0];
        // file.shift();
        // if (!this.isHeaderMatchTemplate(fileHeader)) this.dialogService.alertMessege("Template Titles should not change, make sure to work on uploaded template as it is.")
        // else this.uploadItemExcelSheet(file)
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

  getInvoiceSubmission(invoiceId: number) {
    this.invoiceService.getInvoiceSubmission(invoiceId).subscribe((res: ResponseDto) => this.listInvoices());
  }

  // #endregion

}
