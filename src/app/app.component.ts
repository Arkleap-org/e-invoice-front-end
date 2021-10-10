import { Component, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from './shared/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // #region declare variables

  listOfSideMenu: any;

  // #endregion

  // #region constructor

  constructor(
    private elem: ElementRef,
    public loaderService: LoaderService,
    public translate: TranslateService,
  ) {

    translate.setDefaultLang('en');

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

  }

  // #endregion

}
