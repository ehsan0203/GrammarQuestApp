import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-selection-page',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule],
  templateUrl: './selection-page.component.html',
  styleUrl: './selection-page.component.scss'
})
export class SelectionPageComponent {

  constructor(private router: Router) {}

  onEducationClick() {
    // اینجا میتونی روت به صفحه آموزش رو قرار بدی
    this.router.navigate(['/education']);
  }

  onExamClick() {
    // اینجا میتونی روت به صفحه آزمون رو قرار بدی
    this.router.navigate(['/select-lesson']);
  }
}