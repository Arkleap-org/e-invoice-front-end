// angular core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseDto } from 'src/app/shared/models/api-response.model';
import { InvoiceDto } from 'src/app/shared/models/invoice.model';
import { InvoiceService } from 'src/app/shared/services/invoice.service';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})

export class InvoiceViewComponent implements OnInit {

  // #region declare variables

  invoiceId!: number;
  invoiceDetails!: InvoiceDto;

  // #endregion

  // #region constructor

  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute
  ) {
    // init variables
    this.invoiceDetails = new InvoiceDto;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params["id"];
    this.getInvoiceById();
  }

  // #endregion

  // #region main actions

  getInvoiceById() {
    this.invoiceService.getInvoiceById(this.invoiceId)
      .subscribe(
        (response: ResponseDto) => {
          console.log('get invoice ', response.data);
          this.invoiceDetails = response.data;
        }
      );
  }

  // #endregion

}
