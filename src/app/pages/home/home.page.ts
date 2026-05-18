import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';
import { Expense, Category, COLOR_STYLES } from '../../models/expense.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  currentMonthLabel = '';
  currentMonthTotal = 0;
  currentMonthCount = 0;
  allTotal = 0;
  catCount = 0;
  recent: Expense[] = [];
  cats: Category[] = [];

  // Modal إضافة سريعة
  modalOpen = false;
  form = { amount: null as number | null, date: '', catId: '', note: '' };
  formError = '';

  private storageService = inject(StorageService);
  private authService = inject(AuthService);
  private navService = inject(NavService);

  // Kept as properties so templates can use storage/auth/nav without changes.
  get storage(): StorageService { return this.storageService; }
  get auth(): AuthService { return this.authService; }
  get nav(): NavService { return this.navService; }

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.cats = this.storage.getCategories();
    const expenses = this.storage.getExpenses();
    this.currentMonthTotal = this.storage.getCurrentMonthTotal();
    this.currentMonthCount = this.storage.getCurrentMonthCount();
    this.currentMonthLabel = this.storage.monthLabel(this.storage.getCurrentMonthKey());
    this.catCount = this.cats.length;
    this.allTotal = expenses.reduce((s, e) => s + +e.amount, 0);
    this.recent = [...expenses].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  }

  openModal(): void {
    this.form = { amount: null, date: this.storage.today(), catId: '', note: '' };
    this.formError = '';
    this.modalOpen = true;
  }

  saveExpense(): void {
    if (!this.form.amount || this.form.amount <= 0) { this.formError = 'يرجى إدخال قيمة صحيحة'; return; }
    if (!this.form.date) { this.formError = 'يرجى اختيار التاريخ'; return; }
    if (!this.form.catId) { this.formError = 'يرجى اختيار نوع الصرف'; return; }
    this.storage.addExpense({
      amount: this.form.amount!,
      date: this.form.date,
      catId: this.form.catId,
      note: this.form.note.trim(),
    });
    this.modalOpen = false;
    this.refresh();
  }

  getCatName(id: string): string { return this.cats.find(c => c.id === id)?.name || 'غير محدد'; }
  getCatIcon(id: string): string { return this.cats.find(c => c.id === id)?.icon || 'cash-outline'; }
  getColorBg(id: string): string {
    const color = this.cats.find(c => c.id === id)?.color || 'blue';
    return COLOR_STYLES[color]?.bg || '';
  }
  getColorText(id: string): string {
    const color = this.cats.find(c => c.id === id)?.color || 'blue';
    return COLOR_STYLES[color]?.text || '';
  }
  formatDate(d: string): string {
    return new Date(d).toLocaleDateString('ar', { day: '2-digit', month: 'long' });
  }

  logout(): void { this.auth.logout(); }
  goTo(page: any): void { this.nav.go(page); }
}
