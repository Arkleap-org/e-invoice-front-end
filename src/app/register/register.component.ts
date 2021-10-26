import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';
import { TranslateService } from '@ngx-translate/core';
import { ListOfLanguage } from '../shared/constants/list.constant';
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

  passwordMatched!: boolean;
  isSubmitted: boolean;
  password!: string;
  password2!: string;

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
    this.listOfLang = ListOfLanguage;
    this.isSubmitted = false;

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
      password: ['', [Validators.required, Validators.minLength(8)]],
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

  userRegisteration(form: FormGroup) {
    this.isSubmitted = true;
    if (form.valid && this.passwordMatched) {
      this.authService.userRegisteration(form.value).subscribe((response: ResponseDto) => {
        this.isSubmitted = false;
        this.dialogService.successAndRouteTo('User has been Registerd SuccessFully! Please Login.', '/');
      });
    }
  }

  // #endregion

}
