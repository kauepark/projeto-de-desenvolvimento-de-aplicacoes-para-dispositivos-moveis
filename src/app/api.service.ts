
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'https://www.googleapis.com/books/v1/volumes/?q=+';
  urlId = 'https://www.googleapis.com/books/v1/volumes/';
  KEY_LIVROS_NAO_LIDOS = 'livros-nao-lidos';
  KEY_LIVROS_LIDOS = 'livros-lidos';
  KEY_MEUS_LIVROS = 'meus-livros';
  books: any = [];

  constructor(public http: HttpClient, public toastController: ToastController, public alertController: AlertController, public loadingController: LoadingController
  ) { }

  filtrar(key) {
    return new Promise((resolve, reject) => {
      this.http.get(this.url + key)
        .subscribe((data) => {
          this.books = data;
          resolve(data);
        }, error => {
          if (error.status === 404) {
            resolve(error.status);
          } else {
            console.log('Occoreu um erro ao carregar a pesquisa ', error);
          }
        });
    });
  }
  recuperar(id: string) {
    return this.http.get(this.urlId + `${id}`);
  }
  async save(key: string, livros: any) {
    return await localStorage.setItem(key, livros);
  }

  async presentToast(msg, cl) {
    const toast = await this.toastController.create({
      message: msg,
      color: cl,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

  async presentLoading(msg, time) {
    const loading = await this.loadingController.create({
      message: msg,
      duration: time,
      spinner: 'lines'
    });
    await loading.present();
    const { role, data } = await loading.onDidDismiss();
  }

  async presentAlertConfirm(h, m) {
    const alert = await this.alertController.create({
      header: h,
      message: m,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'danger',
          handler: () => {
          }
        }, {
          text: 'Ok',
          cssClass: 'success',
          handler: () => {
            this.presentToast('Livro adicionado aos Favoritos!', 'success');
          }
        }
      ]
    });
    await alert.present();
  }
}
