import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, Platform, ToastController } from '@ionic/angular';
import { User } from './../../interfaces/user';

import { LoadingController } from '@ionic/angular';
import { Keyboard } from '@capacitor/keyboard';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @ViewChild(IonSlides) slides: IonSlides;
  public wavesPosition = 0;
  public wavesDifference = 80;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;


  constructor(
    // public keyboard: Keyboard,
    public platform: Platform,
    private loadingCtrl:  LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    ) { }

  ngOnInit() { }

  segmentChanged(event: any) {
    if(event.detail.value === 'login') {
      this.slides.slidePrev();
      this.wavesPosition += this.wavesDifference;
    } else {
      this.slides.slideNext();
      this.wavesPosition -= this.wavesDifference;
    }
  }

  async login() {
    await this.showLoading();

    try {
      await this.authService.login(this.userLogin);
    } catch (error) {
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }

 async register() {
    await this.showLoading();
    try {
      const user = await this.authService.register(this.userRegister);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      user.user.uid;
    } catch(error) {
      let message: string;

      switch(error.code) {
        case'auth/email-already-in-use':
        message = 'E-mail já existe!';
        break;

        case'auth/invalid-email':
        message = 'E-mail inválido!';
        break;
      }
      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }

  }

  async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });

    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000 });
    toast.present();
  }

}
