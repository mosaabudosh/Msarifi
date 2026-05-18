import { Component, OnInit, inject } from '@angular/core';

import { StorageService } from '../../services/storage.service';
import { Category } from '../../models/expense.model';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.page.html',
  styleUrls: ['./add-expense.page.scss'],
  standalone: false,
})
export class AddExpensePage implements OnInit {
  amount: number | null = null;
  date = '';
  catId = '';
  note = '';
  cats: Category[] = [];
  showSuccess = false;
  errorMsg = '';

  private storage = inject(StorageService);

  ngOnInit(): void {
    this.date = this.storage.today();
    this.cats = this.storage.getCategories();
  }

  save(): void {
    this.errorMsg = '';
    if (!this.amount || this.amount <= 0) { this.errorMsg = 'يرجى إدخال قيمة صحيحة'; return; }
    if (!this.date)  { this.errorMsg = 'يرجى اختيار التاريخ'; return; }
    if (!this.catId) { this.errorMsg = 'يرجى اختيار نوع الصرف'; return; }

    this.storage.addExpense({
      amount: this.amount!,
      date: this.date,
      catId: this.catId,
      note: this.note.trim(),
    });

    this.amount = null;
    this.note = '';
    this.catId = '';
    this.date = this.storage.today();
    this.showSuccess = true;
    setTimeout(() => this.showSuccess = false, 3000);
  }
}
