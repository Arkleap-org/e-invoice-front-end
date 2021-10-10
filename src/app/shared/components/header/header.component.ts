// angular module
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem, IMenuTrigger, ITdDynamicMenuLinkClickEvent } from '@covalent/core/dynamic-menu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  // #region declare variables

  // name of lists
  listOfLang: IMenuItem[];
  itemList: IMenuItem[];
  invoiceList: IMenuItem[];


  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    public translate: TranslateService,
  ) {
    // init variables
    this.listOfLang = [
      { action: 'ar', text: 'العربية' },
      { action: 'en', text: 'English' }
    ];
    this.itemList = [
      { text: 'Items List', action: 'home/item/list' },
      { text: 'Add Item', action: 'home/item/add' }
    ];
    this.invoiceList = [
      { text: 'Invoices List', action: 'home/invoice/list' },
      { text: 'Add Invoice', action: 'home/invoice/add' }
    ];
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void {
    console.log(this.translate)
  }

  // #endregion

  // #region main actions

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  navigateToScreen(event: ITdDynamicMenuLinkClickEvent): void {
    this.router.navigate([event.action])
  }

  setTriggerText(title: string, icon?: string): IMenuTrigger {
    return { text: title, icon };
  }

  // #endregion

}
