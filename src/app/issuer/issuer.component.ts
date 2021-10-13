// angular core
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

// angular router
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// sweetalert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-issuer',
  templateUrl: './issuer.component.html',
  styleUrls: ['./issuer.component.scss']
})

export class IssuerComponent implements OnInit {

  // #region declare variables

  issuerTypeSource: { label: string, value: string }[];
  listOfActivityCodes: {}[]


  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    // init variables
    this.issuerTypeSource = [
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

    this.listOfActivityCodes = [
      {
        id: 1,
        activityCode: "activity 1"
      },
      {
        id: 2,
        activityCode: "activity 2"
      },
      {
        id: 3,
        activityCode: "activity 3"
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
