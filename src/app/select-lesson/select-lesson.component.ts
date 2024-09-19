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

  startQuiz() {
    if (this.isSelectionComplete()) {
      const userId = localStorage.getItem('UserId'); // گرفتن userId از localStorage
      const apiUrl = `https://localhost:44347/api/Question/StartQuiz`; // آدرس API

      const data = {
        userId: userId,
        lessonNumber: this.selectedLesson,
        questlevel: this.selectedLevel
      };
      console.log(data);
      // ارسال درخواست POST به API
      this.http.post(apiUrl, data).subscribe({
        next: (response: any) => {
          console.log('Quiz started:', response);
          localStorage.setItem('questions', JSON.stringify(response));
          // هدایت به صفحه آزمون
          this.router.navigate(['/question']);
        },
        error: (error) => {
          console.error('Error starting quiz:', error);
          alert('خطایی در شروع آزمون رخ داده است.');
        }
      });
    } else {
      alert('لطفاً درس و سطح را انتخاب کنید.');
    }
  }
}
