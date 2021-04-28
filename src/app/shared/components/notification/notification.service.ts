import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from './notification.component';
import { NotificationType } from './notification.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private DEFAULT_TIMING = 5000;

  constructor(private snackBar: MatSnackBar) { }

  success(message: string, parameters?: any, timing?: number): void {
    this.openSnackBar(message, NotificationType.SUCCESS, timing, parameters, 'success');
  }

  error(message: string, parameters?: any, timing?: number): void {
    this.openSnackBar(message, NotificationType.ERROR, timing, parameters, 'error');
  }

  private openSnackBar(message: string, type: string, parameters?: any, timing?: number, panelClass?: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: timing ? timing : this.DEFAULT_TIMING,
      data: parameters ? { message, type, parameters } : { message, type },
      panelClass: ['notification', panelClass]
    });
  }

}
