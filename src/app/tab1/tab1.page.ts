import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AlertController, Platform, IonInfiniteScroll } from '@ionic/angular';
import { Livro } from './../../models/livro';
import { LivroService } from './../livro.service';
import { ApiService } from './../api.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  lido: boolean;
  livros: any;
  texto: string;
  url: string;
  backButtonSubscription;
  nenhum: boolean;

  palavra: string;


  keyInput: any;
  key: any;
  data: any;
  books: any = [];
  bookIndex: number;

  page: any;
  totalPages: any;

  ngOnInit(): void {
    if (this.api.books) { this.books = this.api.books; }

  }
  ngAfterViewInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    });
  }
  ngOnDestroy() {
    this.backButtonSubscription.unsubscribe();
  }

  constructor(public platform: Platform, public api: ApiService, public router: Router, public livroService: LivroService, public serviceStorage: StorageService, public alertController: AlertController, private socialSharing: SocialSharing) {

    this.texto = 'Você que ama livros, o aplicativo Tag Literario foi feito para você!';
    this.url = 'https://play.google.com/store/apps/details?id=tag.literario.book';


  }

  buscarLivros(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.api.filtrar(val).then((livros: any) => {

        this.livros = livros.items;
        if (this.livros.length === 0) {
          this.nenhum = true;
        } else {
          this.nenhum = false;
        }
      }).catch((err) => {
        console.log(err);
      });

    } else {
      this.livros = [];
    }
  }

  abrirLivro(id: string) {
    this.router.navigate(['/detalhes', id]);
  }

  add(livro: Livro) {
    this.presentAlertConfirm(livro);
  }

  andamento(livro: Livro) {
    this.presentAlertConfirmAndamento(livro);
  }

  async presentAlertConfirmAndamento(livro: Livro) {
    const alert = await this.alertController.create({
      header: 'Leitura em andamento',
      message: '<strong>Você está lendo este livro?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.livroService.adicionarNaoLido(livro);
            this.api.presentToast('Boa leitura, continue assim!', 'success');

          }
        }
      ]
    });
    await alert.present();
  }


  async presentAlertConfirm(livro: Livro) {
    const alert = await this.alertController.create({
      header: 'Adicionar',
      message: '<strong>Você já leu este livro?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.livroService.adicionarLido(livro);
            this.api.presentToast('Livro lido, Parabéns!', 'success');

          }
        }
      ]
    });
    await alert.present();
  }






}







