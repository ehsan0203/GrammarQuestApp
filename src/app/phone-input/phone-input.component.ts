import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; // اضافه کردن Router
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule ,HttpClientModule  ],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss'
})
export class PhoneInputComponent {
  title = 'GrammarQuestApp';
  phoneNumber: string = '';
  isValid: boolean = false;
  isInvalid: boolean = false;
  isLoading: boolean = false; // اضافه کردن حالت لودینگ
  // تزریق Router در constructor
  constructor(private router: Router , private http:HttpClient) {}

  validatePhoneNumber() {
    const regex = /^09[0-9]{9}$/;
    if (regex.test(this.phoneNumber)) {
      this.isValid = true;
      this.isInvalid = false;
    } else {
      this.isValid = false;
      this.isInvalid = true;
    }
  }

  submitPhoneNumber() {
    if (this.isValid) {
      this.isLoading = true; // فعال کردن لودینگ

      const apiUrl = `https://telegram.webchareh.com/api/Account/SendVerificationCode?phoneNumber=${this.phoneNumber}`;
      
      this.http.post(apiUrl, { responseType: 'text' }).subscribe({
        next: (response: any) => {
          console.log('Response code:', response); // اینجا کد دریافتی را لاگ می‌کنیم
          localStorage.setItem('verificationCode', response);
          localStorage.setItem('phoneNumber', this.phoneNumber);
          this.isLoading = false; // خاموش کردن لودینگ بعد از دریافت پاسخ
          this.router.navigate(['/verify-code']);  
        },
        error: (err) => {
          console.error('Error sending verification code:', err);
          this.isLoading = false; // خاموش کردن لودینگ در صورت بروز خطا
          alert('An error occurred while sending the verification code.');
        }
      });
    } else {
      alert('شماره تلفن نامعتبر است.');
    }
  }

}
