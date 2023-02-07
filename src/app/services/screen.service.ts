import { Injectable } from '@angular/core';
import {AlertController, ToastController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
  ) { }

  async presentToast(options: any) {
    const toast = await this.toastController.create({
      duration: 4000,
      ...options
    });

    await toast.present();
  }

  async presentErrorToast(message: string) {
    const toast = await this.toastController.create({
      icon: 'close-circle-sharp',
      duration: 5000,
      message: message,
      color: 'danger'
    });

    await toast.present();
  }

  async presentSuccessToast(message: string) {
    const toast = await this.toastController.create({
      icon: 'checkmark-circle-sharp',
      duration: 5000,
      message: message,
      color: 'success'
    });

    await toast.present();
  }

  async presentWarningToast(message: string) {
    const toast = await this.toastController.create({
      icon: 'alert-circle-sharp',
      duration: 5000,
      message: message,
      color: 'warning'
    });

    await toast.present();
  }

  async presentAlert(options: any) {
    const alert = await this.alertController.create({
      ...options
    });

    await alert.present();
  }
}
