import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // #region declare variables

  listOfLang: IMenuItem[];

  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
  ) {
    // init variables
    this.listOfLang = [
      { action: 'ar', text: 'العربية' },
      { action: 'en', text: 'English' }
    ];
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void { }

  // #endregion

  // #region main actions

  useLanguage(language: string): void {
    this.translate.use(language);
    this.localStorageService.store('lang', language);
  }

  setTriggerText(title: string, icon?: string): IMenuTrigger {
    return { text: title, icon };
  }

  registeredToLogin() {
    this.router.navigate(['/'])
  }

  // #endregion

}
