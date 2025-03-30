// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Post, Comment } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = 'https://dummyjson.com';

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${this.BASE_URL}/users/filter?key=username&value=${username}`);
  }

  getPostsByUser(userId: number): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(`${this.BASE_URL}/posts/user/${userId}`);
  }

  getCommentsByPost(postId: number): Observable<{ comments: Comment[] }> {
    return this.http.get<{ comments: Comment[] }>(`${this.BASE_URL}/comments/post/${postId}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/users/${id}`);
  }
}
