import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-verify-code',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule,HttpClientModule],
  templateUrl: './verify-code.component.html',
  styleUrl: './verify-code.component.scss'
})
export class VerifyCodeComponent {
  verificationCode: string = '';
  isCodeValid: boolean = false;
  isLoading: boolean = false;
  constructor(private http: HttpClient, private router: Router) {}
  validateCode() {
    if (this.verificationCode.length === 6) {
      this.isCodeValid = true;
      this.submitVerificationCode();
    } else {
      this.isCodeValid = false;
    }
  }
  submitVerificationCode() {
    this.isLoading = true; // نمایش لودینگ هنگام ارسال
    const storedCode = localStorage.getItem('verificationCode');
    
    if (this.verificationCode === storedCode) {
      const storedPhoneNumber = localStorage.getItem('phoneNumber');
      const apiUrl = `https://localhost:44347/api/Account/VerifyCode?phoneNumber=${storedPhoneNumber}`;
  
      this.http.post(apiUrl, { inputCode: this.verificationCode, phoneNumber: storedPhoneNumber })
        .subscribe({
          next: (response: any) => {
            this.isLoading = false; // خاموش کردن لودینگ بعد از دریافت پاسخ
  
            if (response && response.userId) {
              localStorage.setItem('UserId', response.userId);
              this.router.navigate(['/select-lesson']); // تغییر مسیر به صفحه مورد نظر
            } else {
              alert('کد تأیید نادرست است.');
            }
          },
          error: (err) => {
            this.isLoading = false; // خاموش کردن لودینگ در صورت خطا
            console.error('Error during verification:', err);
            alert('خطا در تأیید کد.');
          }
        });
    } else {
      this.isLoading = false; // خاموش کردن لودینگ اگر کد نادرست باشد
      alert('کد تأیید نادرست است.');
    }
  }
  

}