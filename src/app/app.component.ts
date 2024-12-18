import { ErrorService, GlobalErrorHandler } from './service/error-service';
import { HeaderComponent } from './component/header/header.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Component, ErrorHandler } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MatSnackBarModule],
  providers: [
    ErrorService,
    // Global error handler, for all Frontend/Angular errors
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'repRec-frontend';
}
