import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[]=[];
  private postsUpdated = new Subject<Post[]>();

  constructor() { }

  getPosts(){
    return [...this.posts];
  }

  getPostUpdateListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: String, content: String){
    const post: Post = {title:title, content: content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
