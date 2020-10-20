import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root'
})

export class UtilityService {
    constructor(private snackBar: MatSnackBar) { }
    showErrorMessage(message) {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['error-snackbar'];
        config.horizontalPosition = 'center';
        config.verticalPosition = 'top';
        this.snackBar.open(message, '', config);
        document.getElementById('loader').classList.remove('loading');
    }
    showSuccessMessage(message) {
        const config = new MatSnackBarConfig();
        config.duration = 5000;
        config.panelClass = ['success-snackbar'];
        config.horizontalPosition = 'center';
        config.verticalPosition = 'top';
        this.snackBar.open(message, '', config);
    }
}