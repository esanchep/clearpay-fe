export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error'
}

export interface NotificationData {
  message: string;
  parameters: any;
  type: string;
}
