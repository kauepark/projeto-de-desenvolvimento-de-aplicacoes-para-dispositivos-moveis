import { Injectable } from '@angular/core';
import { Livro } from 'src/models/livro';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  recuperarTodos(key: string) {
    return new Promise((resolve, reject) => {
      this.storage.get(key)
        .then((livros: Livro[]) => {
          resolve(livros);
        })
        .catch(() => reject());
    });
  }

  async add(key: string, livro: Livro) {
    return await this.recuperarTodos(key).then((livros: any) => {
      if (!livros) {
        livros = [];
      }
      const livroExistente = this.findLivros(livros, livro.id);

      if (!livroExistente) {
        livros.push(livro);
        return this.save(key, livros);
      }
    });
  }

  async remove(key: string, livro: Livro) {
    return await this.recuperarTodos(key).then((livros: any) => {
      if (!livros) {
        livros = [];
      }
      const livroExistente = this.findLivros(livros, livro.id);

      const index = livros.indexOf(livroExistente);
      livros.splice(index, 1);

      return this.save(key, livros);
    });
  }

  save(key: string, livros: Livro[]) {
    return this.storage.set(key, livros);
  }


  findLivros(livros: Livro[], id: string) {
    if (livros == null) {
      livros = [];
    }
    const livrosExistentes = livros.filter((livro: Livro) => {
      return livro.id === id;
    });

    return livrosExistentes.length > 0 ? livrosExistentes[0] : null;
  }
}
