// angular core
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.scss']
})

export class InvoiceDetailsComponent implements OnInit {

  // #region declare variables

  isNewReceiver: boolean;
  listOfReceivers: {}[];
  listOfReceiverType: { label: string, value: string }[];
  listOfCountries: { code: string, en_name: string, ar_name: string }[];
  listOfDocumentTypes: { label: string, value: string }[];
  listOfDocumentTypeVersions: string[];
  listOfItems: { id: number, name: string }[];


  // #endregion

  // #region constructor

  constructor() {
    // init variables
    this.isNewReceiver = false;
    this.listOfReceivers = [
      {
        id: 1,
        name: "khalaf"
      }
    ];
    this.listOfReceiverType = [
      {
        label: 'Business',
        value: 'B'
      },
      {
        label: 'Natural Preson',
        value: 'NP'
      },
      {
        label: 'Foreigner',
        value: 'F'
      }
    ];

    this.listOfCountries = [
      {
        code: 'EG',
        en_name: 'Egypt',
        ar_name: 'مصر'
      },
      {
        code: 'UK',
        en_name: 'United Kingdom',
        ar_name: 'المملكة المتحدة'
      }
    ];

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
  }

  // #endregion

  // #region main actions

  // #end region

}
