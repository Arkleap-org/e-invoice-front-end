// angular
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

// sweetalert
import Swal from 'sweetalert2';

@Injectable({
  providedIn: "root"
})
export class DialogService {

  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
  }

  cancelAndRouteBack(title: string, text: string, route: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "$success",
      cancelButtonColor: "$secondary",
      confirmButtonText: "Yes, I am sure!",
    }).then((result) => { if (result.isConfirmed) this.router.navigate([route]); });
  }


  confirmDelete() {
    const x: any = this.translateService.get('Are you sure?')
    console.log(x)
    return Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
  }



  successAndRouteBack(route: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    this.router.navigate([route]);
  }


  savedSuccessfully(title: string) {
    Swal.fire({
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    })
  }

  successAndRouteTo(title: string, route: string) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 2000
    })
    this.router.navigate([route]);
  }

  alertMessege(title: string) {
    Swal.fire({
      icon: 'warning',
      title: title,
    })
  }

}
