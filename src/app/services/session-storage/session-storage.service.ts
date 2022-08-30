import { Injectable } from '@angular/core';
import { ISessionStorage } from 'src/app/models/history-search';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService<Type extends ISessionStorage> {
  baseName: string = 'session-storage-';
  constructor() {}

  private search(create: boolean = false, data: Type | null = null): string[] {
    let response: string[] = [];
    let count: number = 0;
    let flag: boolean = true;
    while (flag) {
      let key: string = this.baseName + count;
      let item: string | null = sessionStorage.getItem(key);
      if (item !== null) {
        response.push(item);
      }

      if (!item || item === null) {
        if (create && data !== null) {
          data.id = key;
          sessionStorage.setItem(key, JSON.stringify(data));
          flag = false;
        }
        let keys = Object.keys(sessionStorage);
        if (keys.length === 0 || keys.length === response.length) {
          flag = false;
        }
      }

      count++;
    }
    return response;
  }

  getAll(): string[] {
    let response: string[] = [];
    response = this.search();
    return response;
  }

  create(data: Type) {
    if (data === null || data === undefined) {
      return;
    }
    this.search(true, data);
  }

  delete(key: string) {
    sessionStorage.removeItem(key);
  }
}
