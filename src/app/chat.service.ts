import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = 'https://telegram.webchareh.com/api/chat/send'; // آدرس API

  constructor(private http: HttpClient) {}

  sendMessage(message: string): Observable<any> {
    // خواندن userId از localStorage
    const userId = localStorage.getItem('UserId');

    // چک کردن اینکه userId در حافظه ذخیره شده باشد
    if (!userId) {
      console.error('UserId not found in localStorage');
      return throwError(() => new Error('UserId not found in localStorage')); // برگشت خطا به جای undefined
    }

    const body = {
      message,
      userId, // ارسال userId
    };

    return this.http.post<any>(this.apiUrl, body);
  }
}
