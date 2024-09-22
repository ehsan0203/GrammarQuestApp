import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-education-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule,HttpClientModule],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.scss'
})
export class EducationPageComponent {
  lessons = Array.from({ length: 12 }, (_, i) => `درس ${i + 1}`); // لیست دروس 1 تا 12
  selectedLesson: string | null = null;
  bookName: string = 'Touchstone2'; // پیش فرض نام کتاب
  level: number = 1; // پیش فرض سطح 1

  constructor(private router: Router, private http: HttpClient) {}

  selectLesson(lesson: string) {
    this.selectedLesson = lesson;
  }
  onBackClick() {
    this.router.navigate(['/select-page']);
  }
  
  onConfirmClick() {
    if (this.selectedLesson) {
      // پارامترها را به‌درستی به روت ارسال می‌کنیم
      this.router.navigate(['/lesson-details', this.selectedLesson.split(' ')[1], this.level]);
    }
  }
  
}