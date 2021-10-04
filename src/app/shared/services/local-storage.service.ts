import { Injectable } from "@angular/core";

@Injectable()
export class LocalStorageService {

    private localStorage: any;

    constructor() {
        this.localStorage = window.localStorage;
    }

    retrieve(key: string) {
        const item = this.localStorage.getItem(key);
        return item !== null && item !== "undefined" ? JSON.parse(this.localStorage.getItem(key)) : null;
    }

    store(key: string, value: any) {
        this.localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key: string) {
        this.localStorage.removeItem(key);
    }

    removeAll() {
        this.localStorage.clear();
    }
}