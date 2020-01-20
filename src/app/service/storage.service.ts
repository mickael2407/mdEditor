import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setUserId(userId: string): void {
    window.localStorage.setItem('userId', userId);
  }

  getUserId(): string {
    return window.localStorage.getItem('userId');
  }
}
