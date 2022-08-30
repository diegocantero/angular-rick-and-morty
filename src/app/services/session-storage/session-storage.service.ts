import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  baseName: string = 'session-storage-';
  constructor() {}

  private search(create: boolean = false, data: string = ''): string[] {
    let response: string[] = [];
    let count: number = 0;
    let flag: boolean = true;
    while (flag) {
      let key: string = this.baseName + count;
      let item: string | null = sessionStorage.getItem(key);
      if (item !== null) {
        response.push(item);
      }

      if (!item || item == null) {
        if (create && data.length > 0) {
          sessionStorage.setItem(key, data);
        }
        flag = false;
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

  create(data: string) {
    if (data?.trim() === '' || data === null || data === undefined) {
      return;
    }
    this.search(true, data);
  }

  delete(key: string) {}


}
