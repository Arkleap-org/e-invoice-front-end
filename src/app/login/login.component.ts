// angular modules
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

// dynamic menu
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';

//models
import { LoginRequestDto, LoginResponseDto } from '../shared/models/auth.model';

// ngx
import { TranslateService } from '@ngx-translate/core';

// services
import { AuthService } from '../shared/services/auth.service';
import { LocalStorageService } from '../shared/services/local-storage.service';
import { ListOfLanguage } from '../shared/constants/list.constant';
import { SessionStorageService } from '../shared/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  // #region declare variables

  listOfLang: IMenuItem[];
  loginForm!: FormGroup;

  model: LoginRequestDto;
  isSubmitted: boolean;

  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder,
    private sessionStorageService: SessionStorageService
  ) {
    // init variables
    this.listOfLang = ListOfLanguage;
    this.model = new LoginRequestDto;
    this.isSubmitted = false;

    // init forms
    this.initForm();

  }

  // #endregion

  // #region init forms

  initForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  // #endregion

  // #region main actions

  userLogin(model: LoginRequestDto) {
    this.isSubmitted = true;
    if (this.loginForm.valid) {
      this.authService.userLogin(model).subscribe((res: LoginResponseDto) => {
        this.localStorageService.store('user', res);
        const lastTabUrl = this.sessionStorageService.retrieve('last-tab-url') || '/home';
        this.router.navigate([lastTabUrl]);
        this.isSubmitted = false;
      });
    }
  }

  useLanguage(language: string): void {
    this.translate.use(language).subscribe(() => this.localStorageService.store('lang', language));
  }

  setTriggerText(title: string, icon?: string): IMenuTrigger {
    return { text: title, icon };
  }

  // #endregion

}
