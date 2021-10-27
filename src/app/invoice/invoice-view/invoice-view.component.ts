// angular core
import { Component, OnInit } from '@angular/core';

// angular route
import { ActivatedRoute } from '@angular/router';

// models
import { ResponseDto } from '../../shared/models/api-response.model';
import { InvoiceDto } from '../../shared/models/invoice.model';

// services
import { InvoiceService } from '../../shared/services/invoice.service';

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
    this.invoiceService.getInvoiceById(this.invoiceId).subscribe((response: ResponseDto) => {
      this.invoiceDetails = response.data;
    });
  }

  // #endregion

}
