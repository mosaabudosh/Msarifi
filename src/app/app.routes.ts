import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

// Router is used only to satisfy bootstrapApplication() and keep the app running.
// The app's navigation between pages is handled internally by NavService + conditional rendering
// in app.component.html (home/add/list/categories/settings).
export const routes: Routes = [
  {
    path: '',
    // Use the standalone root component as the router target.
    // (No <router-outlet> is used, but this prevents missing-route issues.)
    component: AppComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

