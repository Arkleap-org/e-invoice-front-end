// angular modules
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';
import { TranslateService } from '@ngx-translate/core';
import { LoginRequestDto, LoginResponseDto } from '../shared/models/auth.model';
import { AuthService } from '../shared/services/auth.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  // #region declare variables

  listOfLang: IMenuItem[];

  model: LoginRequestDto;

  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
  ) {
    // init variables
    this.listOfLang = [
      { action: 'ar', text: 'العربية' },
      { action: 'en', text: 'English' }
    ];
    this.model = new LoginRequestDto;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void { }

  // #endregion

  // #region main actions

  userLogin(model: LoginRequestDto) {
    this.authService.userLogin(model).subscribe((res: LoginResponseDto) => {
      this.localStorageService.store('token', res.access);
      this.router.navigate(['/home'])
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language).subscribe(() => this.localStorageService.store('lang', language));
  }

  setTriggerText(title: string, icon?: string): IMenuTrigger {
    return { text: title, icon };
  }

  register() {
    this.router.navigate(['/register']);
  }

  // #endregion

}
