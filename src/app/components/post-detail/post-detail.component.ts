import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
  selector: 'post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  public post: Post;

  constructor(
    private _postService: PostService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {

  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost() {
    //Obtener el id de post
    this._route.params.subscribe(params => {
      let id = +params['id'];
      console.log('id' + id);
      //Peticion para traer datos de dicho post
      this._postService.getPost(id).subscribe(
        response => {
          if (response.status == 'success') {
            this.post = response.post;
            console.log(this.post);
          } else {
            this._router.navigate(['inicio']);
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

}
