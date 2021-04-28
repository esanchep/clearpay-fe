import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationData } from './notification.models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  message: string;
  type: string;
  parameters: any;
  icons = {
    success: 'check_circle',
    error: 'error'
  };

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) private data: NotificationData,
    private dialogRef: MatSnackBarRef<NotificationComponent>
  ) {
    this.message = this.data.message;
    this.type = this.data.type;
    if (!!this.data.parameters) {
      this.parameters = this.data.parameters;
    }
  }

  closeDialog(): void {
    this.dialogRef.dismiss();
  }

}
