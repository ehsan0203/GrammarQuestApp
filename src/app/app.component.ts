import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { animate, query, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule, RouterModule  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', [
        // صفحه فعلی (خروج)
        query(':leave', [
          style({ opacity: 1 }), // صفحه فعلی کامل نمایش داده شده
          animate('0.5s ease-out', style({ opacity: 0 })) // انیمیشن محو شدن صفحه قبلی
        ], { optional: true }),
  
        // صفحه جدید (ورود)
        query(':enter', [
          style({ opacity: 0 }), // صفحه جدید در ابتدا نامرئی
          animate('0.5s ease-out', style({ opacity: 1 })) // انیمیشن ظاهر شدن صفحه جدید
        ], { optional: true })
      ])
    ])
  ]
  
})
export class AppComponent {
  title = 'Home';

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
