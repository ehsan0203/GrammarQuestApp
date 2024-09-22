import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lesson-details',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule,HttpClientModule],
  templateUrl: './lesson-details.component.html',
  styleUrl: './lesson-details.component.scss'
})
export class LessonDetailsComponent implements OnInit {
  bookName: string = 'Touchstone2'; // نام کتاب ثابت
  lessonNumber!: number;
  level: number = 1; // سطح اولیه 1
  explanation: string = ''; // ذخیره توضیحات دریافت‌شده
  maxLevel: number = 4; // حداکثر سطح آموزش
  moreDisabled: boolean = false; // وضعیت دکمه "بیشتر"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.lessonNumber = parseInt(this.route.snapshot.paramMap.get('lessonNumber')!, 10);
    this.getExplanation();
  }

  getExplanation() {
    // درخواست API برای دریافت توضیحات درس بر اساس سطح
    this.http
      .get<any>(`https://telegram.webchareh.com/api/LessonDescriptions/get`, {
        params: {
          bookName: this.bookName,
          lessonNumber: this.lessonNumber.toString(),
          level: this.level.toString(),
        },
      })
      .subscribe((response) => {
        this.explanation = response.explanation;
      });
  }

  onMoreClick() {
    if (this.level < this.maxLevel) {
      this.level++;
      this.getExplanation();
    }
    if (this.level === this.maxLevel) {
      this.moreDisabled = true; // وقتی به سطح 4 رسید، دکمه غیر فعال شود
    }
  }

  onBackClick() {
    this.router.navigate(['/education']); // بازگشت به صفحه انتخاب درس
  }
}