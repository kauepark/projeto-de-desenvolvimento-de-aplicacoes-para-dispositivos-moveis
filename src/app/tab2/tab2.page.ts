import { LivroService } from './../livro.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/models/livro';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  livrosLendo: Livro[] = [];
  livrosJaLidos: Livro[] = [];
  nenhum = false;
  livro: any;
  favorito: boolean;
  lido: boolean;
  imagem: any;
  id: string;
  constructor(

    public router: Router,
    private apiService: ApiService,
    public navCtrl: NavController,
    public livroService: LivroService,
    public alertController: AlertController

  ) {
    this.livro = new Livro();
    this.favorito = false;
    this.lido = false;

  }

  ngOnInit(): void {

  }

  atualizar(event) {
    this.apiService.presentLoading('', 1000);
    this.ionViewDidEnter();
    event.target.complete();
  }

  abrirLivro(id: string) {
    this.router.navigate(['/detalhes', id]);
  }

  goBack() {
    this.navCtrl.back();
  }
  favoritar(livro: Livro) {
    this.livroService
      .favoritar(livro)
      .then(() => {
        this.apiService.presentToast('Adicionado aos favoritos', 'success');
      })
      .catch((error: any) => {
        this.apiService.presentToast('Erro ao adicionar nos favoritos', 'danger');
      });
  }


  remove(livro: Livro) {
    this.presentAlertConfirm(livro);
  }
  ionViewDidEnter() {
    this.livroService.recuperarTodosLidos().then((livros: Livro[]) => {
      this.livrosJaLidos = livros || [];
      if (this.livrosJaLidos.length === 0) {
        this.nenhum = true;
      } else {
        this.nenhum = false;
      }
    });
  }

  recuperaData(data: string) {
    const splitData = data.split('-');
    if (splitData.length > 1) {
      return new Date(`${splitData[0]}/${splitData[1]}/${splitData[2]}`);
    } else {
      return new Date(`${splitData[0]}/1/1`);
    }
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
            this.livroService.removerLido(livro);
            this.apiService.presentToast('Livro removido!', 'success');
            this.livroService.recuperarTodosLidos().then((livros: Livro[]) => {
              this.livrosJaLidos = livros || [];
              if (this.livrosJaLidos.length === 0) {
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
