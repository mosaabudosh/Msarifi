import { Injectable, signal } from '@angular/core';

export type PageName = 'home' | 'add' | 'list' | 'categories' | 'settings';

@Injectable({ providedIn: 'root' })
export class NavService {
  readonly currentPage = signal<PageName>('home');

  go(page: PageName): void {
    this.currentPage.set(page);
  }
}
