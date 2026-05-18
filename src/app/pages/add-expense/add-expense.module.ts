import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddExpensePage } from './add-expense.page';

@NgModule({
  declarations: [AddExpensePage],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [AddExpensePage],
})
export class AddExpensePageModule {}
