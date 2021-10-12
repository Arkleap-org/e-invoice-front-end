// angular core
import { Component, OnInit } from '@angular/core';

// angular router
import { Router } from '@angular/router';

// sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issuer',
  templateUrl: './issuer.component.html',
  styleUrls: ['./issuer.component.scss']
})

export class IssuerComponent implements OnInit {

  // #region declare variables

  issuerType: { label: string, value: string }[];

  // #endregion

  // #region constructor

  constructor(
    private router: Router
  ) {
    // init variables
    this.issuerType = [
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
    ]
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
