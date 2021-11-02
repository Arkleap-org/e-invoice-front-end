// angular core
import { Component, OnInit } from '@angular/core';

// angular route
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/shared/services/dialog.service';

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
    private route: ActivatedRoute,
    private router: Router,
    private dialogService: DialogService
  ) {
    // init variables
    this.invoiceDetails = new InvoiceDto;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params["id"];
    this.loadControls();
  }

  // #endregion

  // #region load controls

  loadControls() {
    this.getInvoiceById(this.invoiceId)
  }

  getInvoiceById(id: number) {
    this.invoiceService.getInvoiceById(id).subscribe((response: ResponseDto) => {
      this.invoiceDetails = response.data;
    });
  }

  routeToInvoiceList() {
    this.router.navigate(['/invoice/list']);
  }

  submitInvoice(internalId: string) {
    this.invoiceService.submitInvoice(internalId).subscribe((response: ResponseDto) => {
      this.dialogService.savedSuccessfully('Your invoice is beeing Submitted...');
    });
  }
  // #endregion

}
