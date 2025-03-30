import { Component } from '@angular/core';

import { ApiService } from './services/api.service';
import { User, Post } from './interfaces/models';
import { switchMap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'taller_2_andres';
  username = '';
  user: User | null = null;
  posts: Post[] = [];
  error = '';

  constructor(private apiService: ApiService) {}

  buscarUsuario() {
    this.error = '';
    this.user = null;
    this.posts = [];

    this.apiService.getUserByUsername(this.username).pipe(
      switchMap(response => {
        const user = response.users[0];
        if (!user) {
          this.error = 'Usuario no encontrado.';
          return EMPTY;
        }
        this.user = user;
        return this.apiService.getPostsByUser(user.id);
      })
    ).subscribe({
      next: (response) => {
        this.posts = response.posts;
      },
      error: () => {
        this.error = 'Error al buscar la información.';
      }
    });
  }
}
