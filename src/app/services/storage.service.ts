import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  AppData, Category, Expense, MonthGroup,
  DEFAULT_DATA,
} from '../models/expense.model';

const KEY = 'msarifi_v2';

@Injectable({ providedIn: 'root' })
export class StorageService {

  private data!: AppData;
  private refresh$ = new BehaviorSubject<void>(undefined);
  readonly changes$ = this.refresh$.asObservable();

  constructor() { this.load(); }

  private load(): void {
    try {
      const raw = localStorage.getItem(KEY);
      this.data = raw ? JSON.parse(raw) : structuredClone(DEFAULT_DATA);
    } catch {
      this.data = structuredClone(DEFAULT_DATA);
    }
  }

  private save(): void {
    localStorage.setItem(KEY, JSON.stringify(this.data));
    this.refresh$.next();
  }

  // ── Auth ────────────────────────────────────────────────────────
  checkPassword(pwd: string): boolean { return pwd === this.data.password; }
  changePassword(newPwd: string): void { this.data.password = newPwd; this.save(); }

  // ── Categories ──────────────────────────────────────────────────
  getCategories(): Category[] { return [...this.data.categories]; }

  addCategory(cat: Omit<Category, 'id'>): void {
    this.data.categories.push({ ...cat, id: 'c' + Date.now() });
    this.save();
  }

  updateCategory(id: string, updates: Partial<Omit<Category, 'id'>>): void {
    const i = this.data.categories.findIndex(c => c.id === id);
    if (i > -1) { this.data.categories[i] = { ...this.data.categories[i], ...updates }; this.save(); }
  }

  deleteCategory(id: string): void {
    this.data.categories = this.data.categories.filter(c => c.id !== id);
    this.data.expenses.forEach(e => { if (e.catId === id) e.catId = ''; });
    this.save();
  }

  isCategoryUsed(id: string): boolean {
    return this.data.expenses.some(e => e.catId === id);
  }

  // ── Expenses ────────────────────────────────────────────────────
  getExpenses(): Expense[] { return [...this.data.expenses]; }

  addExpense(exp: Omit<Expense, 'id' | 'month' | 'createdAt'>): void {
    this.data.expenses.push({
      ...exp,
      id: 'e' + Date.now(),
      month: exp.date.slice(0, 7),
      createdAt: Date.now(),
    });
    this.save();
  }

  updateExpense(id: string, updates: Partial<Omit<Expense, 'id' | 'createdAt'>>): void {
    const i = this.data.expenses.findIndex(e => e.id === id);
    if (i > -1) {
      if (updates.date) updates['month'] = updates.date.slice(0, 7);
      this.data.expenses[i] = { ...this.data.expenses[i], ...updates };
      this.save();
    }
  }

  deleteExpense(id: string): void {
    this.data.expenses = this.data.expenses.filter(e => e.id !== id);
    this.save();
  }

  // ── Helpers ─────────────────────────────────────────────────────
  getMonthGroups(expenses: Expense[], order: 'asc' | 'desc' = 'desc'): MonthGroup[] {
    const map = new Map<string, Expense[]>();
    expenses.forEach(e => {
      if (!map.has(e.month)) map.set(e.month, []);
      map.get(e.month)!.push(e);
    });
    const groups: MonthGroup[] = [];
    map.forEach((exps, key) => {
      groups.push({
        monthKey: key,
        monthLabel: this.monthLabel(key),
        expenses: [...exps].sort((a, b) =>
          order === 'desc' ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)),
        total: exps.reduce((s, e) => s + +e.amount, 0),
      });
    });
    return groups.sort((a, b) =>
      order === 'desc' ? b.monthKey.localeCompare(a.monthKey) : a.monthKey.localeCompare(b.monthKey));
  }

  getCurrentMonthKey(): string { return new Date().toISOString().slice(0, 7); }

  getCurrentMonthTotal(): number {
    const mk = this.getCurrentMonthKey();
    return this.data.expenses.filter(e => e.month === mk).reduce((s, e) => s + +e.amount, 0);
  }

  getCurrentMonthCount(): number {
    return this.data.expenses.filter(e => e.month === this.getCurrentMonthKey()).length;
  }

  monthLabel(key: string): string {
    const [y, m] = key.split('-');
    const names = ['يناير','فبراير','مارس','أبريل','مايو','يونيو',
                   'يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
    return `${names[+m - 1]} ${y}`;
  }

  fmt(n: number): string {
    return (+n).toLocaleString('ar', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      + ' ' + this.data.currency;
  }

  today(): string { return new Date().toISOString().slice(0, 10); }

  exportJSON(): string { return JSON.stringify(this.data, null, 2); }

  clearExpenses(): void { this.data.expenses = []; this.save(); }
}
