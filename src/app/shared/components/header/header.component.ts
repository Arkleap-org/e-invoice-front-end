import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  listOfLang: {}[];

  constructor(
    public translate: TranslateService,
  ) {
    // init variables
    this.listOfLang = [{ key: 'ar', value: 'العربية' }];
  }

  ngOnInit(): void {
  }

  // #region main actions

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  // #endregion

}
