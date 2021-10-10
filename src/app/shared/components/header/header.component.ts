// angular module
import { Component, OnInit } from '@angular/core';
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';
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


  // #endregion

  // #region constructor

  constructor(
    public translate: TranslateService,
  ) {
    // init variables
    this.listOfLang = [
      { action: 'ar', text: 'العربية' },
      { action: 'en', text: 'English' }
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

  setTriggerText(title: string, icon?: string): IMenuTrigger {
    return { text: title, icon };
  }

  // #endregion

}
