// angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // #region declare variables

  listOfLang: {}[];

  // #endregion

  // #region constructor

  constructor(
    private router: Router,
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

  ngOnInit(): void { }

  // #endregion

  // #region main actions

  login() {
    this.router.navigate(['/home'])
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  // #endregion

}
