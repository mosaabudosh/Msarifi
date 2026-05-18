import { Component, inject } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: false,
})
export class SettingsPage {
  oldPwd  = '';
  newPwd  = '';
  confPwd = '';
  showOld  = false;
  showNew  = false;
  showConf = false;
  pwdMsg = '';
  pwdSuccess = false;

  private auth = inject(AuthService);
  private storage = inject(StorageService);



  changePwd(): void {
    this.pwdMsg = '';
    if (!this.oldPwd)              { this.setMsg('يرجى إدخال كلمة المرور الحالية', false); return; }
    if (this.newPwd.length < 4)    { this.setMsg('كلمة المرور الجديدة 4 أحرف على الأقل', false); return; }
    if (this.newPwd !== this.confPwd) { this.setMsg('كلمة المرور وتأكيدها غير متطابقين', false); return; }

    if (this.auth.changePassword(this.oldPwd, this.newPwd)) {
      this.setMsg('✓ تم تغيير كلمة المرور بنجاح', true);
      this.oldPwd = ''; this.newPwd = ''; this.confPwd = '';
    } else {
      this.setMsg('كلمة المرور الحالية غير صحيحة', false);
    }
  }

  private setMsg(msg: string, success: boolean): void {
    this.pwdMsg = msg;
    this.pwdSuccess = success;
    setTimeout(() => this.pwdMsg = '', 4000);
  }

  exportData(): void {
    const blob = new Blob([this.storage.exportJSON()], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `msarifi_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  }

  clearAll(): void {
    if (confirm('سيتم حذف جميع المصاريف نهائياً. هل أنت متأكد؟')) {
      this.storage.clearExpenses();
    }
  }
}
