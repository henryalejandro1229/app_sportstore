import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  token: string = '';
  constructor(private swPush: SwPush, private readonly http: HttpClient) {}

  // preparePushNotification() {
  //   this.swPush.subscription.subscribe((sub) => {
  //     console.log('subscription', sub)
  //     this.sendNotification(sub);
  //   });
  // }

  sendNotification(token: any, type: string) {
    let body = {
      token,
      type
    };
    const url = `${environment.urlEmail}/send-push-notification`;
    return this.http.post(url, body);
  }
}
