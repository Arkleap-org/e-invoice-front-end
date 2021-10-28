// angular core
import { Component, OnInit } from '@angular/core';

// angular route
import { ActivatedRoute } from '@angular/router';

// models
import { ResponseDto } from '../../shared/models/api-response.model';
import { InvoiceErrorDto } from '../../shared/models/invoice.model';

// services
import { InvoiceService } from '../../shared/services/invoice.service';

@Component({
  selector: 'app-invoice-errors',
  templateUrl: './invoice-errors.component.html',
  styleUrls: ['./invoice-errors.component.scss']
})

export class InvoiceErrorsComponent implements OnInit {

  // #region declare variables

  invoiceId!: number;

  invoiceErrorsDetails!: InvoiceErrorDto;

  // names of booleans
  hasHeaderErrors: boolean;
  hasLineErrors: boolean;
  hasOtherErrors: boolean;

  // #endregion

  // #region constructor

  constructor(
    private route: ActivatedRoute,
    private invoiceService: InvoiceService
  ) {
    // init variables
    this.invoiceErrorsDetails = new InvoiceErrorDto;

    this.hasHeaderErrors = false;
    this.hasLineErrors = false;
    this.hasOtherErrors = false;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params["id"];
    this.viewInvoiceErrors();
  }

  // #endregion

  // #region main actions

  viewInvoiceErrors() {
    this.invoiceService.viewInvoiceErrors(this.invoiceId).subscribe((response: ResponseDto) => {
      this.invoiceErrorsDetails = response.data
      this.invoiceHasErrors(this.invoiceErrorsDetails);
    });
  }

  invoiceHasErrors(invoiceErrors: InvoiceErrorDto) {
    if (invoiceErrors.header_errors.length) this.hasHeaderErrors = true;
    if (invoiceErrors.lines_errors.length) this.hasLineErrors = true;
    if (invoiceErrors.other_errors.length) this.hasOtherErrors = true;
  }

  // #endregion

}
