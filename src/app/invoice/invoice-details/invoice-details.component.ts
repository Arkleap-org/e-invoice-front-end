// angular core
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// modals
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { ReceiverDto } from 'src/app/shared/models/receiver.model';
import { ReceiverComponent } from 'src/app/shared/popups/receiver/receiver.component';

// services
import { DialogService } from 'src/app/shared/services/dialog.service';
import { InvoiceService } from 'src/app/shared/services/invoice.service';
import { ReceiverService } from 'src/app/shared/services/receiver.service';


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})

export class InvoiceDetailsComponent implements OnInit {

  // #region declare variables

  isNewReceiver: boolean;
  listOfReceivers: ReceiverDto[];
  listOfDocumentTypes: { label: string, value: string }[];
  listOfDocumentTypeVersions: string[];
  listOfItems: { id: number, name: string }[];


  // #endregion

  // #region constructor

  constructor(
    private dialogService: DialogService,
    private invoiceService: InvoiceService,
    private receiverService: ReceiverService,
    public dialog: MatDialog
  ) {
    // init variables
    this.isNewReceiver = false;

    this.listOfReceivers = [];

    this.listOfDocumentTypes = [
      {
        label: "Invoice",
        value: "I"
      },
      {
        label: "Credit Memo",
        value: "C"
      },
      {
        label: "Debit Memo",
        value: "D"
      }
    ];

    this.listOfDocumentTypeVersions = [
      '0.9', '1.0'
    ];

    this.listOfItems = [
      {
        id: 1,
        name: "item 1"
      },
      {
        id: 2,
        name: "item 2"
      }
    ];
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.listReceivers();
  }

  // #endregion

  // #region main actions

  listReceivers() {
    this.receiverService.listReceivers().subscribe((response: ResponseDto) => {
      this.listOfReceivers = response.data;
    });
  }

  openReceiverPopup() {
    const dialogRef = this.dialog.open(ReceiverComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listReceivers();
    });
  }

  cancelAndRouteBack() {
    this.dialogService.cancelAndRouteBack("Are you sure?", "You won't be able to revert this!", "/home");
  }

  // #end region

}
