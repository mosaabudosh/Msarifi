import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { NavService } from '../../services/nav.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  password = '';
  showPassword = false;
  showError = false;
  loading = false;
  showHintPassword = true;

  private auth = inject(AuthService);
  private nav = inject(NavService);
  private storage = inject(StorageService);

  ngOnInit(): void {
    this.showHintPassword = this.storage.checkIfHavePassword();
  }

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
