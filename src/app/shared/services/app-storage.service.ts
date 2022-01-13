import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  language!: BehaviorSubject<string>;

  constructor(private localStorageService: LocalStorageService) { 
        // set init value for language
        const currentLang = this.localStorageService.retrieve('lang') || 'ar';
        this.language = new BehaviorSubject<string>(currentLang);
  }

  getLanguage() {
    return this.language
  }

  setLanguage(title: string) {
    this.language.next(title);
  }
}
