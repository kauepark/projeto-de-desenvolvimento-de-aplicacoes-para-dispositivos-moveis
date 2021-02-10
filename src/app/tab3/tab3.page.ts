import { Component } from '@angular/core';
import { Livro } from 'src/models/livro';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { NavController, PopoverController, LoadingController } from '@ionic/angular';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  livrosLendo: Livro[] = [];
  livrosJaLidos: Livro[] = [];
  lido: boolean;
  livros: any;
  id: string;
  livro: any;

  nenhum = false;

  constructor(
    public router: Router,
    private api: ApiService,
    public navCtrl: NavController,
    public livroService: LivroService,
    public popoverCtrl: PopoverController

  ) {
    this.livro = new Livro();
  }


  ionViewDidEnter() {
    this.livroService.recuperarTodosNaoLidos().then((livros: Livro[]) => {
      this.livrosLendo = livros || [];


      if (this.livrosLendo.length === 0) {
        this.nenhum = true;
      } else {
        this.nenhum = false;
      }
    });
  }



  add(livro: Livro) {
    this.livroService
      .removerNaoLido(livro)
      .then(() => {
        this.livroService
          .adicionarLido(livro)
          .then(() => {
            this.lido = true;
            this.api.presentToast('Marcado como lido.', 'success');
          })
          .catch((error: any) => {
            console.log(error);
          });
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  remove(livro: Livro) {
    this.livroService.removerNaoLido(livro);
    this.api.presentToast('Livro removido, na próxima leia até o fim!', 'danger');
    this.atualizar(event);
  }

  abrirLivro(id: string) {
    this.router.navigate(['/detalhes', id]);
  }

  atualizar(event) {
    this.api.presentLoading('Atualizando', 1000);
    this.ionViewDidEnter();
    event.target.complete();
  }

}

