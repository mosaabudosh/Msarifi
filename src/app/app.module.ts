import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LoginPageModule }       from './pages/login/login.module';
import { HomePageModule }        from './pages/home/home.module';
import { AddExpensePageModule }  from './pages/add-expense/add-expense.module';
import { ExpenseListPageModule } from './pages/expense-list/expense-list.module';
import { CategoriesPageModule }  from './pages/categories/categories.module';
import { SettingsPageModule }    from './pages/settings/settings.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot({ mode: 'ios' }),
    AppRoutingModule,
    LoginPageModule,
    HomePageModule,
    AddExpensePageModule,
    ExpenseListPageModule,
    CategoriesPageModule,
    SettingsPageModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}