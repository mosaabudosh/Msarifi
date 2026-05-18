import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExpenseListPage } from './expense-list.page';

@NgModule({
  declarations: [ExpenseListPage],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [ExpenseListPage],
})
export class ExpenseListPageModule {}
