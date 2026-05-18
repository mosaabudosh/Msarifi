import { Component, OnInit, inject } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Category, CategoryColor, CATEGORY_ICONS, COLOR_STYLES } from '../../models/expense.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: false,
})
export class CategoriesPage implements OnInit {
  cats: Category[] = [];
  icons = CATEGORY_ICONS;
  colorStyles = COLOR_STYLES;

  newName  = '';
  newIcon  = 'restaurant-outline';
  newColor: CategoryColor = 'blue';
  addError = '';

  editOpen = false;
  editId   = '';
  editName  = '';
  editIcon  = '';
  editColor: CategoryColor = 'blue';

  private storageService = inject(StorageService);
  get storage(): StorageService { return this.storageService; }


  ngOnInit(): void { this.refresh(); }

  refresh(): void { this.cats = this.storage.getCategories(); }

  getCount(id: string): number { return this.storage.getExpenses().filter(e => e.catId === id).length; }
  getColorBg(cat: Category): string   { return COLOR_STYLES[cat.color]?.bg   || ''; }
  getColorText(cat: Category): string { return COLOR_STYLES[cat.color]?.text || ''; }

  addCategory(): void {
    this.addError = '';
    if (!this.newName.trim()) { this.addError = 'يرجى إدخال اسم النوع'; return; }
    this.storage.addCategory({ name: this.newName.trim(), icon: this.newIcon, color: this.newColor });
    this.newName = '';
    this.newIcon = 'restaurant-outline';
    this.newColor = 'blue';
    this.refresh();
  }

  openEdit(cat: Category): void {
    this.editId    = cat.id;
    this.editName  = cat.name;
    this.editIcon  = cat.icon;
    this.editColor = cat.color;
    this.editOpen  = true;
  }

  saveEdit(): void {
    if (!this.editName.trim()) return;
    this.storage.updateCategory(this.editId, {
      name: this.editName.trim(), icon: this.editIcon, color: this.editColor,
    });
    this.editOpen = false;
    this.refresh();
  }

  deleteCategory(cat: Category): void {
    const msg = this.storage.isCategoryUsed(cat.id)
      ? `تحذير: النوع "${cat.name}" مستخدم في بعض المصاريف. هل تريد حذفه؟`
      : `هل تريد حذف النوع "${cat.name}"؟`;
    if (confirm(msg)) { this.storage.deleteCategory(cat.id); this.refresh(); }
  }
}
