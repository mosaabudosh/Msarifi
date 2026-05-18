import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  password = '';
  showPassword = false;
  showError = false;
  loading = false;

  private auth = inject(AuthService);
  private nav = inject(NavService);


  doLogin(): void {
    this.loading = true;
    this.showError = false;
    setTimeout(() => {
      if (this.auth.login(this.password)) {
        this.nav.go('home');

      } else {
        this.showError = true;
        this.loading = false;
      }
    }, 400);
  }
}
