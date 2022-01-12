import { Direction } from '@angular/cdk/bidi';
import { Component, ElementRef } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppStorageService } from './shared/services/app-storage.service';
import { LoaderService } from './shared/services/loader.service';
import { LocalStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // #region declare variables

  listOfSideMenu: any;
  textDir: Direction = 'rtl';

  // #endregion

  // #region constructor

  constructor(
    private elem: ElementRef,
    public loaderService: LoaderService,
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
    private appStoreService: AppStorageService
  ) {
    const lang = this.localStorageService.retrieve('lang') || 'en';
    this.translate.use(lang).subscribe(() => this.localStorageService.store('lang', lang));

    // deactivate autocomplete in all app forms
    this.loaderService.addAfterAllRequestsHandler(() => {
      const forms = this.elem.nativeElement.querySelectorAll('form');
      const inputs = this.elem.nativeElement.querySelectorAll('input');
      forms.forEach((form: HTMLElement) => {
        form.setAttribute('autocomplete', 'off');
      });
      inputs.forEach((input: HTMLElement) => {
        input.setAttribute('autocomplete', 'new-password');
      });
    });

    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.appStoreService.setLanguage(event.lang);
      if (event.lang == 'ar') {
        this.textDir = 'rtl';
      } else {
        this.textDir = 'ltr';
      }
    });

  }

  // #endregion

}
