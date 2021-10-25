// angular core
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiver',
  templateUrl: './receiver.component.html',
  styleUrls: ['./receiver.component.scss']
})

export class ReceiverComponent implements OnInit {

  // #region declare variables

  // names of lists
  listOfReceiverType: { label: string, value: string }[];
  listOfCountries: { code: string, en_name: string, ar_name: string }[];

  // #endregion

  // region constructor

  constructor() {
    // init variables
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
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
  }

  // #endregion

  // #region init forms

  // #endregion

  // #region main actions

  // #endregion

}
