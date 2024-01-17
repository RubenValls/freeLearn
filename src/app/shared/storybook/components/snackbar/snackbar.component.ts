import { Component } from '@angular/core';
import { AlertsService } from 'src/app/shared/services/alerts/alerts.service';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent {
  type: string = 'success';

  constructor( private alertsService: AlertsService ){}

  openSuccessSnackBar(){
    this.alertsService.successMessage('Example Success Message')
  }

  openErrorSnackBar(){
    this.alertsService.errorMessage('Example Error Message')
  }

  openWarningSnackBar(){
    this.alertsService.warningMessage('Example Warning Message')
  }
}
