import { Injectable, signal, inject } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _loggedIn = signal(false);
  readonly loggedIn = this._loggedIn.asReadonly();

  private storage = inject(StorageService);


  login(pwd: string): boolean {
    if (this.storage.checkPassword(pwd)) { this._loggedIn.set(true); return true; }
    return false;
  }

  logout(): void { this._loggedIn.set(false); }

  changePassword(oldPwd: string, newPwd: string): boolean {
    if (!this.storage.checkPassword(oldPwd)) return false;
    this.storage.changePassword(newPwd);
    return true;
  }
}
