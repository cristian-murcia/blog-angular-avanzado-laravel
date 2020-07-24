import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [PostService]
})
export class HomeComponent implements OnInit {

  public page_title: string;
  public url;
  public post: Array<Post>;

  constructor(
    private _postService: PostService
  ) { 
    this.page_title = 'Pagina de inicio';
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this._postService.getPosts().subscribe(
      response => {
        if (response.status == 'success') {
          this.post = response.posts;
          console.log(this.post);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
