import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  homeOutline, addCircleOutline, listOutline,
  pricetagOutline, settingsOutline,
} from 'ionicons/icons';

import { AuthService } from './services/auth.service';
import { NavService, PageName } from './services/nav.service';

import { LoginPageModule }       from './pages/login/login.module';
import { HomePageModule }        from './pages/home/home.module';
import { AddExpensePageModule }  from './pages/add-expense/add-expense.module';
import { ExpenseListPageModule } from './pages/expense-list/expense-list.module';
import { CategoriesPageModule }  from './pages/categories/categories.module';
import { SettingsPageModule }    from './pages/settings/settings.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    LoginPageModule,
    HomePageModule,
    AddExpensePageModule,
    ExpenseListPageModule,
    CategoriesPageModule,
    SettingsPageModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  tabs: { id: PageName; label: string; icon: string }[] = [
    { id: 'home',       label: 'الرئيسية',  icon: 'home-outline'        },
    { id: 'add',        label: 'إضافة',     icon: 'add-circle-outline'  },
    { id: 'list',       label: 'السجل',     icon: 'list-outline'        },
    { id: 'categories', label: 'الأنواع',   icon: 'pricetag-outline'    },
    { id: 'settings',   label: 'الإعدادات', icon: 'settings-outline'    },
  ];

  constructor(public auth: AuthService, public nav: NavService) {
    addIcons({ homeOutline, addCircleOutline, listOutline, pricetagOutline, settingsOutline });
  }

  go(page: PageName): void { this.nav.go(page); }
  isActive(page: PageName): boolean { return this.nav.currentPage() === page; }
}