import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LoaderService {

  loading: boolean = false;
  isLoading = new BehaviorSubject(this.loading);

  afterLoadAllRequestsFunctions: Function[];

  constructor() {
    this.afterLoadAllRequestsFunctions = [];
    this.isLoading.subscribe((result) => {
      setTimeout(() => { this.loading = result; }, 0.001);
    });
  }

  addAfterAllRequestsHandler(fn: Function) {
    this.afterLoadAllRequestsFunctions.push(fn);
  }

  handleAfterAllRequestsFunctions() {
    this.afterLoadAllRequestsFunctions.map(fn => fn());
  }
}
