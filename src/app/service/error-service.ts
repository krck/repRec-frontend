import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

//
// Set as the GlobalErrorHandler (provider in app.component.ts)
//
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private errorService: ErrorService) { }

    handleError(error: any): void { this.errorService.outputError(error, false); }
}

//
// Error Service that can be injected everywhere to output errors (Popup anc Console)
//
@Injectable()
export class ErrorService {
    constructor(private injector: Injector) { }

    outputError(error: any, fromBackend: boolean): void {
        // Parse the error info
        const errPrefix: string = (fromBackend) ? 'Backend Error: ' : 'Frontend Error: ';
        const errText: string | undefined = (error.statusText ?? error.name ?? error.message) || undefined;

        // Output the error
        const snackBar = this.injector.get(MatSnackBar);
        console.error(errPrefix, error);
        snackBar.open(`${errPrefix} ${errText}`, 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
        });
    }
}
