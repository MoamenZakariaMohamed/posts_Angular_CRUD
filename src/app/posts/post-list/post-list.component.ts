import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  start:number=0;
  postData!:Post[];
  postsRecords!:number;
  constructor(private postService:PostService) { }

  ngOnInit(): void {
    this.getAll(this.start)
    this.getAllPostsLength()
  }

  getAll(start:number){
    this.postService.getAll(start).subscribe((data:Post[])=>{
      this.postData=data
  })
}

getAllPostsLength(){
  this.postService.allPostslength().subscribe((data:any)=>{
    this.postsRecords=data.length
  })
}
paginateData(event:any) {
  this.getAll(event.page+1);
}


}
