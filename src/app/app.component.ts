import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { LoginService } from './login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app_sportstore';
  public readonly VAPID_PUBLIC_KEY =
    'BAN5l7dvIHSrQfUEhwYeFeTUPc5mZ8tR2Xv3H2y7-ytI1vXh2hoGlj19PCVS06-1n4SJ8JW2_RTuMovcm6FO2Q8';

  constructor(private swPush: SwPush, private _ls: LoginService) {
    this.subscribeToNotifications();
  }

  subscribeToNotifications(): any {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then((sub) => {})
      .catch((err) => console.log(err));
  }

  sendNotification(): any {
    this.swPush.subscription.subscribe((res) => {
      this._ls.sendNotification(res).subscribe();
    });
  }
}
