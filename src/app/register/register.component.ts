// angular modules
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';
import { TranslateService } from '@ngx-translate/core';

// constants
import { ListOfLanguage } from '../shared/constants/list.constant';

// models
import { ResponseDto } from '../shared/models/api-response.model';

// services
import { AuthService } from '../shared/services/auth.service';
import { DialogService } from '../shared/services/dialog.service';
import { LocalStorageService } from '../shared/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {

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

  // #region ngAfterOnInit

  ngAfterViewInit() {
    document.getElementsByTagName('body')[0].classList.add('bg-base-color');
    document.getElementsByTagName('body')[0].style.overflowY = "hidden";
  }

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
