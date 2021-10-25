// angular modules
import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

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

  ) {
    // init variables
    this.listOfLang = [
      { action: 'ar', text: 'العربية' },
      { action: 'en', text: 'English' }
    ];
    this.model = new LoginRequestDto;
    this.initForm();
    this.isSubmitted = false;

  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void { }

  // #endregion

    // #region init forms

    initForm() {

      this.loginForm = this.formBuilder.group({
    username: ['', Validators.required],
        password: ['', Validators.required],
      });
    }
  
  // #region main actions

  userLogin(model: LoginRequestDto) {

    this.isSubmitted = true;
    
    if (this.loginForm.valid){

    
    console.log('login function')
    this.authService.userLogin(model).subscribe((res: LoginResponseDto) => {
      this.localStorageService.store('token', res.access);
      this.localStorageService.store('user', { first_name: res.first_name, has_issuer: res.has_issuer });
      this.router.navigate(['/home'])
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

  register() {
    this.router.navigate(['/register']);
  }

  // #endregion

}
