import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";

  constructor(public postService: PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form: NgForm){
    if(form.invalid){
      return;
    }
    this.postService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }

  // onAddPost(){
  //   this.newPost = this.enteredValue;
  // }

  // onAddPost(postInput: HTMLTextAreaElement){
  //   this.newPost = postInput.value;
  //   // console.dir(postInput);
  //   // this.newPost = 'Hello!';
  // }

}
