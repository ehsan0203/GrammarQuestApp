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
    // دریافت کد تأیید ذخیره شده در localStorage
    const storedCode = localStorage.getItem('verificationCode');
  
    // مقایسه کد وارد شده توسط کاربر با کد ذخیره شده
    if (this.verificationCode === storedCode) {
        const storedPhoneNumber = localStorage.getItem('phoneNumber');  // شماره تلفن ذخیره شده
        const apiUrl = `https://localhost:44347/api/Account/VerifyCode?phoneNumber=${storedPhoneNumber}`;
      
        // ارسال درخواست به API برای تأیید کد
        this.http.post(apiUrl, { inputCode: this.verificationCode, phoneNumber: storedPhoneNumber })
            .subscribe({
                next: (response: any) => {
                    // بررسی موفقیت آمیز بودن پاسخ API
                    console.log('Response from API:', response);
                    if (response && response.userId) {
                        // ذخیره UserId در localStorage
                        localStorage.setItem('UserId', response.userId);
                        
                        // هدایت به صفحه بعد
                        this.router.navigate(['/select-lesson']);  // تغییر مسیر به صفحه مورد نظر
                    } else {
                        alert('کد تأیید نادرست است.');
                    }
                },
                error: (err) => {
                    console.error('Error during verification:', err);
                    alert('خطا در تأیید کد.');
                }
            });
    } else {
        // اگر کد نادرست باشد، به کاربر خطا نمایش دهید
        alert('کد تأیید نادرست است.');
    }
}

}