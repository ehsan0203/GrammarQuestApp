import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-question-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule,HttpClientModule],
  templateUrl: './question-page.component.html',
  styleUrl: './question-page.component.scss'
})
export class QuestionPageComponent implements OnInit {
  questions: any[] = [];
  currentQuestionIndex: number = 0;
  selectedOption: number | null = null;
  showExplanation: boolean = false;  // نمایش مدال
  explanationText: string = '';  // توضیحات
  correctAnswer: string = '';  // جواب درست
  isCorrectAnswer: boolean | null = null;
  userId = localStorage.getItem('UserId');
  // تعریف لیست پاسخ‌ها
userAnswers: { questionId: string, isCorrect: boolean, selectedOption: number }[] = [];


  constructor(private router: Router,private cdr: ChangeDetectorRef,private http:HttpClient ) {}

  ngOnInit() {
    const storedQuestions = localStorage.getItem('questions');
    if (storedQuestions) {
      this.questions = JSON.parse(storedQuestions);
    }
  }

// انتخاب گزینه توسط کاربر
selectOption(option: number) {
  console.log("selectOption Start");
  this.selectedOption = option;
  const currentQuestion = this.questions[this.currentQuestionIndex];
  this.correctAnswer = currentQuestion.correctAnswer; // جواب درست تنظیم می‌شود

  // ذخیره کردن پاسخ کاربر در لیست
  this.userAnswers.push({
    questionId: currentQuestion.questionId, // فرض اینکه سوالات دارای یک شناسه منحصر به فرد (id) هستند
    isCorrect: `option${option}` === this.correctAnswer,
    selectedOption: option
  });

  if (`option${option}` === this.correctAnswer) {
    // اگر جواب درست بود
    this.isCorrectAnswer = true;

    // بعد از 0.5 ثانیه به سوال بعدی بروید
    setTimeout(() => {
      this.nextQuestion();
    }, 500);
  } else {
    // اگر جواب اشتباه بود
    this.isCorrectAnswer = false;

    // ابتدا کلاس گزینه درست را نمایش دهید
    setTimeout(() => {
      this.showExplanationModal(false, currentQuestion.correctAnswerExplanation);
    }, 1000); // نمایش مدال با تأخیر 0.5 ثانیه
  }
}




// ارسال لیست پاسخ‌ها به بک‌اند
submitAnswers() {
  const answersPayload = {
    userId: this.userId, // فرض می‌کنیم که شناسه کاربر موجود است
    answers: this.userAnswers // ارسال لیست پاسخ‌ها
  };

  console.log(answersPayload);
  
  this.http.post('https://telegram.webchareh.com/api/Question/SubmitAnswers', answersPayload)
    .subscribe(response => {
      console.log('Answers submitted successfully', response);

      // ذخیره داده‌های پاسخ در localStorage
      localStorage.setItem('quizResult', JSON.stringify(response));

      // انتقال به صفحه نتیجه
      this.router.navigate(['/result']);
    }, error => {
      console.error('Error submitting answers', error);
    });
}




showExplanationModal(isCorrect: boolean, explanation: string) {
  this.explanationText = explanation;
  this.showExplanation = true; // نمایش مدال
}

  // رفتن به سوال بعدی
  nextQuestion() {
    console.log("nextQuestion Start")
    this.showExplanation = false;  // بستن مدال
    this.currentQuestionIndex++;  // به سوال بعدی بروید

    if (this.currentQuestionIndex < this.questions.length) {
      this.selectedOption = null;
      this.isCorrectAnswer = null;

      // حذف کلاس های درست و غلط از گزینه‌ها
      const options = document.querySelectorAll('.option');
      options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
      });
    } else {
      // اگر به آخرین سوال رسیدید، به صفحه نتیجه بروید
      this.router.navigate(['/result']);
    }
  }
  // بستن مدال و رفتن به سوال بعدی
  closeModal() {
    // بستن مدال
    this.showExplanation = false;
  
    // پاک کردن کلاس‌های رنگی
    this.selectedOption = null;
    this.isCorrectAnswer = null;
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
      option.classList.remove('correct', 'incorrect');
    });
  
    // به سوال بعدی بروید
    this.nextQuestion();
  }
  
  // دکمه برای ارسال لیست در هنگام اتمام کوییز
finishQuiz() {
  if (this.currentQuestionIndex === this.questions.length - 1 || this.currentQuestionIndex === 20) {
    this.submitAnswers();
  }
}

// دکمه برگشت
  goBack() {
    this.submitAnswers();
    this.router.navigate(['/']); // مسیر بازگشت
  }
}
