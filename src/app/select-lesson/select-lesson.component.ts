import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-select-lesson',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule,HttpClientModule],
  templateUrl: './select-lesson.component.html',
  styleUrl: './select-lesson.component.scss'
})
export class SelectLessonComponent {
  selectedLesson: number | null = null;
  selectedLevel: number | null = null;
  isLoading: boolean = false; // متغیر برای کنترل نمایش لودینگ

  constructor(private http: HttpClient, private router: Router) {}

  selectLesson(lesson: number) {
    this.selectedLesson = lesson;
  }

  selectLevel(level: number) {
    this.selectedLevel = level;
  }

  isSelectionComplete(): boolean {
    return this.selectedLesson !== null && this.selectedLevel !== null;
  }
  goBack() {
    this.router.navigate(['/select-page']);
  }
  
  startQuiz() {
    if (this.isSelectionComplete()) {
      this.isLoading = true; // نمایش لودینگ
      const userId = localStorage.getItem('UserId');
      const apiUrl = `https://telegram.webchareh.com/api/Question/StartQuiz`;

      const data = {
        userId: userId,
        lessonNumber: this.selectedLesson,
        questlevel: this.selectedLevel
      };

      // ارسال درخواست POST به API
      this.http.post(apiUrl, data).subscribe({
        next: (response: any) => {
          this.isLoading = false; // خاموش کردن لودینگ
          console.log('Quiz started:', response);
          localStorage.setItem('questions', JSON.stringify(response));
          this.router.navigate(['/question']); // هدایت به صفحه آزمون
        },
        error: (error) => {
          this.isLoading = false; // خاموش کردن لودینگ در صورت بروز خطا
          console.error('Error starting quiz:', error);
          alert('خطایی در شروع آزمون رخ داده است.');
        }
      });
    } else {
      alert('لطفاً درس و سطح را انتخاب کنید.');
    }
  }
}

