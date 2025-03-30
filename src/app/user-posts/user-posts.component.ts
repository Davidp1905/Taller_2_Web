import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Post, Comment } from '../interfaces/models';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnChanges {
  @Input() posts: Post[] = [];
  commentsMap: { [postId: number]: Comment[] } = {};

  constructor(private apiService: ApiService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['posts'] && this.posts.length > 0) {
      this.loadCommentsForPosts();
    }
  }

  loadCommentsForPosts() {
    const observables: Observable<{ comments: Comment[] }>[] = this.posts.map(post =>
      this.apiService.getCommentsByPost(post.id)
    );

    forkJoin(observables).subscribe((responses) => {
      responses.forEach((res, i) => {
        this.commentsMap[this.posts[i].id] = res.comments;
      });
    });
  }
}


