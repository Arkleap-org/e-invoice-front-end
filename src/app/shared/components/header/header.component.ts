// angular module
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  // #region declare variables

  listOfLang: {}[];

  // #endregion

  // #region constructor

  constructor(
    public translate: TranslateService,
  ) {
    // init variables
    this.listOfLang = [
      { key: 'ar', value: 'العربية' },
      { key: 'en', value: 'English' }
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

  // #endregion

}
