import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NotificationData } from './notification.models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {
  public message: string;
  public type: string;
  public parameters: any;
  public icons = {
    success: 'check_circle',
    error: 'error'
  };

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: NotificationData,
    private dialogRef: MatSnackBarRef<NotificationComponent>
  ) {
    this.message = data.message;
    this.type = data.type;
    if (!!data.parameters) {
      this.parameters = data.parameters;
    }
  }

  public closeDialog(): void {
    this.dialogRef.dismiss();
  }

}
