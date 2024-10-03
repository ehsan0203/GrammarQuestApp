import { Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent {
  userMessage: string = '';
  messages: { text: string, isUser: boolean }[] = [];
  isTyping: boolean = false;

  // دسترسی به عنصر chat-box با ViewChild
  @ViewChild('chatBox') chatBox!: ElementRef;

  constructor(private chatService: ChatService) {}

  sendMessage() {
    if (this.userMessage.trim()) {
      // نمایش پیام کاربر در رابط کاربری
      this.messages.push({ text: this.userMessage, isUser: true });

      // فعال کردن حالت "در حال تایپ"
      this.isTyping = true;

      // ارسال پیام به API
      this.chatService.sendMessage(this.userMessage).subscribe(
        (response) => {
          if (response && response.answer) {
            // نمایش پاسخ دریافت شده از API
            this.messages.push({ text: response.answer, isUser: false });
          }
          // غیر فعال کردن حالت "در حال تایپ"
          this.isTyping = false;
          this.scrollToBottom(); // اسکرول به پایین چت
        },
        (error) => {
          console.error('Error sending message:', error);
          // غیر فعال کردن حالت "در حال تایپ" حتی در صورت بروز خطا
          this.isTyping = false;
        }
      );

      // پاک کردن فیلد پیام پس از ارسال
      this.userMessage = '';
      this.scrollToBottom(); // اسکرول به پایین چت
    }
  }

  // تابع اسکرول به پایین
  scrollToBottom(): void {
    try {
      this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
}

