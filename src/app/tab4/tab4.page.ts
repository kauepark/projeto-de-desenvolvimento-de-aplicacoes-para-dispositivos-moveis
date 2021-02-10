import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/models/livro';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NavController, AlertController } from '@ionic/angular';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  favoritado: Livro[] = [];
  lido: boolean;
  livros: any;
  livro: any;
  favorito: boolean;
  nenhum = false;
  id: string;

  constructor(
    public router: Router,
    private api: ApiService,
    public navCtrl: NavController,
    public livroService: LivroService,
    public alertController: AlertController

  ) {
    this.livro = new Livro();
    this.favorito = false;
    this.lido = false;
  }

  atualizar(event) {
    this.api.presentLoading('Atualizando', 1000);
    this.ionViewDidEnter();
    event.target.complete();
  }

  ionViewDidEnter() {
    this.livroService.recuperarFavoritos().then((livros: Livro[]) => {
      this.favoritado = livros || [];
      if (this.favoritado.length === 0) {
        this.nenhum = true;
      } else {
        this.nenhum = false;
      }
    });
  }

  remove(livro: Livro) {
    this.presentAlertConfirm(livro);
  }

  private recuperar(id) {
    this.api.recuperar(id).subscribe((livro: any) => {
      const livroInfo = livro.volumeInfo;
      if (livroInfo.imageLinks) {
        this.livro.thumbnail = livroInfo.imageLinks.medium;
      }
    });
  }


  abrirLivro(id: string) {
    this.router.navigate(['/detalhes', id]);
  }
  async presentAlertConfirm(livro: Livro) {
    const alert = await this.alertController.create({
      header: 'Remover',
      message: '<strong>Deseja remover este Livro?</strong>',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Ok',
          handler: () => {
            this.livroService.removerFavorito(livro);
            this.api.presentToast('Livro removido!', 'success');
            this.livroService.recuperarFavoritos().then((livros: Livro[]) => {
              this.favoritado = livros || [];
              if (this.favoritado.length === 0) {
                this.nenhum = true;
              } else {
                this.nenhum = false;
              }
            });

          }
        }
      ]
    });
    await alert.present();
  }
}
