import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostComment } from 'src/app/models/postComment.model';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  postId!:number;
  postComments!:PostComment[];
  constructor(private route: ActivatedRoute,private postService:PostService ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.postId = +param["id"];
    });
    this.getPostComment(this.postId);
  }


  getPostComment(postId:number){
    this.postService.getPostComment(postId).subscribe((res:PostComment[])=>{
      this.postComments=res
  })
}

}
