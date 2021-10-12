// angular core
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-issuer',
  templateUrl: './issuer.component.html',
  styleUrls: ['./issuer.component.scss']
})

export class IssuerComponent implements OnInit {

  // #region declare variables

  issuerType: any[];

  // #endregion

  // #region constructor

  constructor() {
    this.issuerType = [
      'Business', 'Nature Person', 'Foreigner'
    ]
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
  }

  // #endregion

  // #region main actions

  // #endregion

}
