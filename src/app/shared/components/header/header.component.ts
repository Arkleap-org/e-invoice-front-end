// angular module
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';
import { TranslateService } from '@ngx-translate/core';

// constants
import { ListOfLanguage } from '../../constants/list.constant';

// components
import { AddReceiverComponent } from '../../../receiver/add-receiver/add-receiver.component';

// models
import { LoginResponseDto } from '../../models/auth.model';

// services
import { LocalStorageService } from '../../services/local-storage.service';
import { SecurityService } from '../../services/security.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {

  // #region declare variables

  // name of lists
  listOfLang: IMenuItem[];
  userFirstName!: string;

  // #endregion

  // #region constructor

  constructor(
    private router: Router,
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,
    public securityService: SecurityService,
  ) {

    // init variables
    this.listOfLang = ListOfLanguage;
    const lang = this.localStorageService.retrieve('lang') || 'en';
    this.translate.use(lang).subscribe(() => this.localStorageService.store('lang', lang));
    this.userFirstName = (this.localStorageService.retrieve('user') as LoginResponseDto).first_name;
  }

  // #endregion

  // #region main actions

  useLanguage(language: string): void {
    this.translate.use(language).subscribe(() => this.localStorageService.store('lang', language));
  }

  setTriggerText(title: string, icon?: string): IMenuTrigger {
    return { text: title, icon };
  }

  openReceiverPopup() {
    this.dialog.open(AddReceiverComponent);
  }

  downloadWebAgent() {
    if (this.securityService.user && this.securityService.user.web_agent) {
      const url = environment.webAgentBaseUrl + this.securityService.user?.web_agent;
      window.open(url, "_blank");
    }
  }

  logout() {
    // this.localStorageService.removeAll();
    // this.router.navigate(['/'])
    this.securityService.logout();
  }

  // #endregion

}
