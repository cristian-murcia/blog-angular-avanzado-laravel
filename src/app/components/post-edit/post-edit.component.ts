import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { global } from '../../services/global';

@Component({
  selector: 'post-edit',
  templateUrl: '../post-new/post-new.component.html',
  providers: [UserService, CategoryService, PostService]
})
export class PostEditComponent implements OnInit {

  public page_title: string;
  public status;
  public identity;
  public token;
  public post: Post;
  public categories;
  public is_edit: boolean;
  public url: string;

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "20",
    uploadAPI: {
      url: global.url + '/post/upload',
      method: "POST",
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: "Sube una imagen al post"
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _categoryService: CategoryService,
    private _postService: PostService

  ) {
    this.page_title = 'Editar entrada';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = true;
    this.url = global.url;
  }

  ngOnInit(): void {
    this.getCategories();
    this.post = new Post(1, this.identity.id, 1, '', '', null, null);
    this.getPost();
  }

  //Metodo para crear una entrada
  onSubmit(form) {
    this._postService.update(this.token, this.post, this.post.id).subscribe(
      response => {
        if (response.status == 'success') {
          //this.post = response.post;
          this.status = 'success';
          this._router.navigate(['/entrada', this.post.id]);
          //form.reset();
        } else {
          this.status = 'error';
        }
      },
      error => {
        this.status = 'error';
        console.log(<any>error);
      }
    );
  }

  getCategories() {
    this._categoryService.getCategories().subscribe(
      response => {
        if (response.status == 'success') {
          this.categories = response.categories;
          console.log(this.categories);
        }
      },
      error => {
        console.log(<any>error);
      }
    );
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

            if (this.post.user_id != this.identity.sub) {
              this._router.navigate(['inicio']);
            }

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

  //Metodo de subida de imagen
  imageUpload(data) {
    let image_data = JSON.parse(data.response);
    //console.log(data);

    this.post.image = image_data.image;
  }

}
