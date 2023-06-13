import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { environment } from 'src/environments/environment';
import { PostComment } from '../models/postComment.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  getAll(start:number): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiURL+`posts?_start=${start}&_limit=5`);
  }

  getpostById(id: any): Observable<Post> {
    return this.http.get<Post>(environment.apiURL+`posts/${id}`);
  }
  getPostComment(postId:number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(environment.apiURL+`comments?postId=${postId}`);
  }

  allPostslength(){
    return this.http.get(environment.apiURL+"posts")
  }
  updatePost(postId:number,post:Post){
    return this.http.put<any>(environment.apiURL+`posts/${postId}`,post);
  }

}
