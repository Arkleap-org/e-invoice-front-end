// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { Router } from '@angular/router';

// sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issuer-address',
  templateUrl: './issuer-address.component.html',
  styleUrls: ['./issuer-address.component.scss']
})

export class IssuerAddressComponent implements OnInit {

  // #region declare variables

  listOfCountries: { code: string, en_name: string, ar_name: string }[];

  // #endregion

  // #region constructor

  constructor(
    private router: Router
  ) {

    // init variables
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

  // #region main actions

  cancel() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "$success",
      cancelButtonColor: "$secondary",
      confirmButtonText: "Yes, I am sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(["/home"]);
      }
    });
  }

  // #endregion

}
