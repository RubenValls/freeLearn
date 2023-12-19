import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(private _snackBar: MatSnackBar) { }

  errorMessage = (message: string, action?: string, duration?: number) => {
    this._snackBar.open(message, action ? action : "Close", {duration: duration ? duration : 2000, panelClass: 'error-snackbar'})
  }

  successMessage = (message: string, action?: string, duration?: number) => {
    this._snackBar.open(message, action ? action : "Close", {duration: duration ? duration : 2000, panelClass: 'success-snackbar'})
  }

  warningMessage = (message: string, action?: string, duration?: number) => {
    this._snackBar.open(message, action ? action : "Close", {duration: duration ? duration : 2000, panelClass: 'warning-snackbar'})
  }

}
