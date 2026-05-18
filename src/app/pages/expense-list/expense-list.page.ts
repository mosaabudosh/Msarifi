import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Expense, Category, MonthGroup, COLOR_STYLES } from '../../models/expense.model';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.page.html',
  styleUrls: ['./expense-list.page.scss'],
  standalone: false,
})
export class ExpenseListPage implements OnInit {
  searchQuery = '';
  sortOrder: 'asc' | 'desc' = 'desc';
  monthGroups: MonthGroup[] = [];
  cats: Category[] = [];
  collapsedGroups = new Set<string>();

  // Modal
  modalOpen = false;
  editingId: string | null = null;
  mForm = { amount: null as number | null, date: '', catId: '', note: '' };
  mFormError = '';

  private storageService = inject(StorageService);
  get storage(): StorageService { return this.storageService; }

  ngOnInit(): void { this.refresh(); }

  refresh(): void {
    this.cats = this.storage.getCategories();
    this.applyFilter();
  }

  applyFilter(): void {
    let exps = this.storage.getExpenses();
    const q = this.searchQuery.toLowerCase().trim();
    if (q) {
      exps = exps.filter(e => {
        const cat = this.cats.find(c => c.id === e.catId);
        return String(e.amount).includes(q)
          || e.date.includes(q)
          || (cat?.name.toLowerCase().includes(q) ?? false)
          || (e.note?.toLowerCase().includes(q) ?? false);
      });
    }
    this.monthGroups = this.storage.getMonthGroups(exps, this.sortOrder);
  }

  setSort(order: 'asc' | 'desc'): void {
    this.sortOrder = order;
    this.applyFilter();
  }

  toggleGroup(key: string): void {
    if (this.collapsedGroups.has(key)) this.collapsedGroups.delete(key);
    else this.collapsedGroups.add(key);
  }

  isCollapsed(key: string): boolean { return this.collapsedGroups.has(key); }

  openAdd(defaultMonth = ''): void {
    this.editingId = null;
    this.mForm = {
      amount: null,
      date: defaultMonth ? defaultMonth + '-01' : this.storage.today(),
      catId: '',
      note: '',
    };
    this.mFormError = '';
    this.modalOpen = true;
  }

  openEdit(exp: Expense): void {
    this.editingId = exp.id;
    this.mForm = { amount: exp.amount, date: exp.date, catId: exp.catId, note: exp.note || '' };
    this.mFormError = '';
    this.modalOpen = true;
  }

  saveModal(): void {
    this.mFormError = '';
    if (!this.mForm.amount || this.mForm.amount <= 0) { this.mFormError = 'يرجى إدخال قيمة صحيحة'; return; }
    if (!this.mForm.date)  { this.mFormError = 'يرجى اختيار التاريخ'; return; }
    if (!this.mForm.catId) { this.mFormError = 'يرجى اختيار نوع الصرف'; return; }

    if (this.editingId) {
      this.storage.updateExpense(this.editingId, {
        amount: this.mForm.amount!, date: this.mForm.date,
        catId: this.mForm.catId, note: this.mForm.note.trim(),
      });
    } else {
      this.storage.addExpense({
        amount: this.mForm.amount!, date: this.mForm.date,
        catId: this.mForm.catId, note: this.mForm.note.trim(),
      });
    }
    this.modalOpen = false;
    this.refresh();
  }

  deleteExpense(id: string): void {
    if (confirm('هل تريد حذف هذا المصروف؟')) {
      this.storage.deleteExpense(id);
      this.refresh();
    }
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
    return new Date(d).toLocaleDateString('ar', { day: '2-digit', month: 'long', year: 'numeric' });
  }
}
