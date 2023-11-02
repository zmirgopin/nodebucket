import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  // static snackBar: MatSnackBar;
  constructor() {}

  public handleError(error: Error) {
    const errorMsg = 'Error: ' + error.message;
    console.error(errorMsg);
    // ErrorService.snackBar.open('Error: ' + error.message);
    alert(errorMsg);
  }
}
