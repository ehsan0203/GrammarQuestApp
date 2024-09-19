import { Routes } from '@angular/router';
import { VerifyCodeComponent } from './verify-code/verify-code.component';
import { PhoneInputComponent } from './phone-input/phone-input.component';
import { SelectLessonComponent } from './select-lesson/select-lesson.component';
import { QuestionPageComponent } from './question-page/question-page.component';
import { ResultComponent } from './result/result.component';

export const routes: Routes = [
    { path: '', component: PhoneInputComponent }, // صفحه اصلی
    { path: 'verify-code', component: VerifyCodeComponent }, // صفحه تایید کد
    { path: 'select-lesson', component: SelectLessonComponent },
    { path: 'question', component: QuestionPageComponent },
    { path: 'result', component: ResultComponent },
];
