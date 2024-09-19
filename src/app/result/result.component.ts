import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './result.component.html',
  styleUrl: './result.component.scss'
})
export class ResultComponent implements OnInit {
  // تعریف متغیرها
  correctAnswers: number = 0;
  incorrectAnswers: number = 0;
  score: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // دریافت داده‌ها از localStorage
    const resultData = localStorage.getItem('quizResult');
    if (resultData) {
      const result = JSON.parse(resultData);
      this.correctAnswers = result.correctAnswers;
      this.incorrectAnswers = result.incorrectAnswers;
      this.score = result.score;
    } else {
      // اگر داده‌ای موجود نبود، کاربر را به صفحه انتخاب درس برگردان
      this.router.navigate(['/select-lesson']);
    }
  }

  goBack() {
    this.router.navigate(['/select-lesson']);
  }
}