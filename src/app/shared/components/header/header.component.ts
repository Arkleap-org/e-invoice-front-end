// angular module
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IMenuItem, IMenuTrigger } from '@covalent/core/dynamic-menu';
import { TranslateService } from '@ngx-translate/core';
import { ListOfLanguage } from '../../constants/list.constant';
import { LoginResponseDto } from '../../models/auth.model';
import { ReceiverComponent } from '../../popups/receiver/receiver.component';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  // #region declare variables

  // name of lists
  listOfLang: IMenuItem[];
  userFirstName!: string;


  // #endregion

  // #region constructor

  constructor(
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
    public dialog: MatDialog,

  ) {
    // init variables
    this.listOfLang = ListOfLanguage;
    const lang = this.localStorageService.retrieve('lang') || 'en';
    this.translate.use(lang).subscribe(() => this.localStorageService.store('lang', lang));
    this.userFirstName = (this.localStorageService.retrieve('user') as LoginResponseDto).first_name;
  }

  // #endregion

  // #region ngOnInit

  ngOnInit(): void { }

  // #endregion

  // #region main actions

  useLanguage(language: string): void {
    this.translate.use(language).subscribe(() => this.localStorageService.store('lang', language));
  }

  setTriggerText(title: string, icon?: string): IMenuTrigger {
    return { text: title, icon };
  }


openReceiverPopup() {
  const dialogRef = this.dialog.open(ReceiverComponent);

  // dialogRef.afterClosed().subscribe(result => {
  //   this.listReceivers();
  // });
}



  // #endregion

}
