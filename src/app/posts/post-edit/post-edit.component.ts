import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css'],
  providers: [MessageService]
})
export class PostEditComponent implements OnInit {
  postId!:number;
  post!:Post;
  postform!: FormGroup;
  messages:String=""
  constructor(private route: ActivatedRoute,private postService:PostService,private fb: FormBuilder ,private messageService: MessageService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.postId = +param["id"];
    });
    this.postForm()
    this.getPostById(this.postId);
  }

postForm(){
  this.postform = this.fb.group({
    id: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    title: ['', [Validators.required]],
    body: ['', [Validators.required]],
  });
}
getPostById(postId:number){
    this.postService.getpostById(postId).subscribe((res:Post)=>{
    this.post=res
    this.postform.patchValue({
      id: this.post.id,
      title: this.post.title,
      body: this.post.body,
      userId:this.post.userId
    });
 })
}

updatePost() {
  if (this.postform.valid) {
    const updatedPost = this.postform.value;
    this.postService.updatePost(this.postId,updatedPost).subscribe(
      (res:any) => {
        this.addSingle("success",'Post updated successfully')
      },
      (error) => {
        this.addSingle("error",'Error updating post:')
        console.log('Error updating post:', error);
      }
    );
  }
}
addSingle(type:string,message:string) {
  this.messageService.add({key: 'bc',severity:type, summary:message});
}
clear() {
  this.messageService.clear();
}
}
