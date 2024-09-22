import { Routes } from '@angular/router';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { SelectLessonComponent } from './select-lesson/select-lesson.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { ResultComponent } from './result/result.component';
import { AuthGuard } from './auth.guard'; // گاردی که ساخته‌ایم
import { SelectionPageComponent } from './selection-page/selection-page.component';
import { EducationPageComponent } from './education-page/education-page.component';
import { LessonDetailsComponent } from './lesson-details/lesson-details.component';

export const routes: Routes = [
    { path: '', component: PhoneInputComponent, canActivate: [AuthGuard] }, // بررسی با AuthGuard
    { path: 'verify-code', component: VerifyCodeComponent }, // صفحه تایید کد
    { path: 'select-lesson', component: SelectLessonComponent },
    { path: 'question', component: QuestionPageComponent },
    { path: 'result', component: ResultComponent },
    { path: 'select-page', component: SelectionPageComponent },
    { path: 'education', component: EducationPageComponent },
    { path: 'lesson-details/:lessonNumber/:level', component: LessonDetailsComponent },

];
