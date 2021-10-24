import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';
import { TranslateService } from '@ngx-translate/core';
import { ResponseDto } from '../shared/models/api-response.model';
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // #region declare variables

  passwordMisMatch: boolean;
  isSubmitted: boolean;

  // names of lists
  listOfLang: IMenuItem[];

  // names of forms
  registrationForm!: FormGroup

  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService
  ) {
    // init variables
    this.listOfLang = [
      { action: 'ar', text: 'العربية' },
      { action: 'en', text: 'English' }
    ];
    this.isSubmitted = false;
    this.passwordMisMatch = false;

    // init forms
    this.initForms();
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void { }

  // #endregion

  // #region initForms

  initForms() {
    this.initRegistrationForm();
  }

  initRegistrationForm() {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required]
    });
  }

  // get controls
  get getRegisterationControls() {
    return this.registrationForm.controls;
  }
  // #endregion

  // #region main actions

  useLanguage(language: string): void {
    this.translate.use(language).subscribe(() => this.localStorageService.store('lang', language));
  }

  setTriggerText(title: string, icon?: string): IMenuTrigger {
    return { text: title, icon };
  }

  registeredToLogin() {
    this.router.navigate(['/'])
  }

  userRegisteration(form: FormGroup) {
    this.isSubmitted = true;
    this.passwordMisMatch = false;
    if (form.value.password === form.value.password2) {
      if (form.valid) {
        this.authService.userRegisteration(form.value).subscribe((response: ResponseDto) => {
          console.log(response);
          this.isSubmitted = false;
          this.passwordMisMatch = false;
          this.dialogService.saveAndRouteTo('User has been Registerd SuccessFully! Please Login.', '/');
        });
      }
    } else {
      this.passwordMisMatch = true;
    }
  }

  // #endregion

}
