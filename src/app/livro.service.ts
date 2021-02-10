import { ToastController, AlertController } from '@ionic/angular';
import { Livro } from './../models/livro';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable()
export class LivroService {
  private KEY_LIVROS_NAO_LIDOS = 'livros-nao-lidos';
  private KEY_LIVROS_LIDOS = 'livros-lidos';
  private KEY_LIVROS_FAVORITOS = 'livros-favoritos';

  constructor(private storage: StorageService, public toastController: ToastController, public alertController: AlertController) { }

  recuperarTodosLidos() {
    return this.storage.recuperarTodos(this.KEY_LIVROS_LIDOS);
  }

  recuperarTodosNaoLidos() {
    return this.storage.recuperarTodos(this.KEY_LIVROS_NAO_LIDOS);
  }

  adicionarLido(livro: Livro) {
    return this.storage.add(this.KEY_LIVROS_LIDOS, livro);
  }

  removerLido(livro: Livro) {
    return this.storage.remove(this.KEY_LIVROS_LIDOS, livro);
  }

  adicionarNaoLido(livro: Livro) {
    return this.storage.add(this.KEY_LIVROS_NAO_LIDOS, livro);
  }

  removerNaoLido(livro: Livro) {
    return this.storage.remove(this.KEY_LIVROS_NAO_LIDOS, livro);
  }

  favoritar(livro: Livro) {
    return this.storage.add(this.KEY_LIVROS_FAVORITOS, livro);
  }

  recuperarFavoritos() {
    return this.storage.recuperarTodos(this.KEY_LIVROS_FAVORITOS);
  }

  removerFavorito(livro: Livro) {
    return this.storage.remove(this.KEY_LIVROS_FAVORITOS, livro);
  }

  async presentToast(msg, cl) {
    const toast = await this.toastController.create({
      message: msg,
      color: cl,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }



}
