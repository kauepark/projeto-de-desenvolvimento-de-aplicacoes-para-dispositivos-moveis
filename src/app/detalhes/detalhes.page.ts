import { LivroService } from './../livro.service';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/models/livro';
import { NavController, ToastController, NavParams, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { DescricaoPage } from '../descricao/descricao.page';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  livro: Livro;
  lido: boolean;
  favorito: boolean;
  argumentos = null;
  constructor(

    public activeRoute: ActivatedRoute,
    private apiService: ApiService,
    public navCtrl: NavController,
    public livroService: LivroService,
    public modalController: ModalController

  ) {
    this.livro = new Livro();
    this.favorito = false;
    this.lido = false;

  }

  add(id: string) {
    console.log('ok');
    this.apiService.presentAlertConfirm('Favorito', 'Livro será adicionado aos seus favoritos, não pare de ler!');

  }

  favorite(id: string) {
    console.log('ok');
    console.log('ok');
    this.apiService.presentAlertConfirm('Favorito', 'Livro será adicionado aos seus favoritos, não pare de ler!');
  }


  ngOnInit(): void {
    this.argumentos = this.activeRoute.snapshot.params.optional_id;
    if (this.argumentos != null) {
      this.recuperarLivro(this.argumentos);
    }
  }
  goBack() {
    this.navCtrl.back();
    this.argumentos = null;
  }

  private recuperarLivro(id: string) {
    this.apiService.recuperar(id).subscribe((livro: any) => {
      const livroInfo = livro.volumeInfo;
      this.livro.id = id;
      this.livro.title = livroInfo.title;
      this.livro.subtitle = livroInfo.subtitle;
      this.livro.authors = livroInfo.authors;
      this.livro.publisher = livroInfo.title;
      this.livro.description = livroInfo.description;
      this.livro.pageCount = livroInfo.pageCount;
      if (livroInfo.publishedDate) {
        this.livro.publishedDate = this.recuperaData(livroInfo.publishedDate);
      }
      if (livroInfo.imageLinks) {
        this.livro.thumbnail = livroInfo.imageLinks.small;
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


}
