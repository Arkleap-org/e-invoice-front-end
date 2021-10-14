// amgular
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

// sweetalert
import Swal from 'sweetalert2';

@Injectable({
  providedIn: "root"
})
export class DialogService {

  constructor(
    private router: Router
  ) { }

  cancelAndRouteBack(title: string, text: string, route: string) {
    Swal.fire({
      title, text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "$success",
      cancelButtonColor: "$secondary",
      confirmButtonText: "Yes, I am sure!",
    }).then((result) => { if (result.isConfirmed) this.router.navigate([route]); });
  }

}
