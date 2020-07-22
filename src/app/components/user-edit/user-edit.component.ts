import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { global } from '../../services/global';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
  providers: [UserService]
})
export class UserEditComponent implements OnInit {

  public page_title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  public url;

  public froala_options: Object = {
    charCounterCount: true,
    toolbarButtons: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsXS: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsSM: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
    toolbarButtonsMD: ['bold', 'italic', 'underline', 'paragraphFormat', 'alert'],
  };

  public afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: "20",
    uploadAPI: {
      url: global.url + '/user/upload',
      method: "POST",
      headers: {
        "Authorization": this._userService.getToken()
      }
    },
    theme: "attachPin",
    hideProgressBar: false,
    hideResetBtn: true,
    hideSelectBtn: false,
    attachPinText: "Sube tu avatar de usuario"
  };

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Ajuste de usuario';
    this.user = new User(1, '', '', 'ROLE_USER', '', '', '', '');
    this.identity = _userService.getIdentity();
    this.token = _userService.getToken();
    this.url = global.url;

    //Rellenar datos de usuario
    this.user = new User(this.identity.sub,
      this.identity.name,
      this.identity.surname,
      this.identity.role,
      this.identity.email, '',
      this.identity.description,
      this.identity.image
    );
  }

  ngOnInit(): void {
  }

  //Metodo de ajustes de usuario
  onSubmit(form) {
    this._userService.update(this.token, this.user).subscribe(
      response => {
        console.log(response);
        if (response) {
          this.status = 'success';

          //Actualizar datos de sesión
          if (response.changes.name) {
            this.user.name = response.changes.name;
          }
          if (response.changes.surname) {
            this.user.surname = response.changes.surname;
          }
          if (response.changes.email) {
            this.user.email = response.changes.email;
          }
          if (response.changes.description) {
            this.user.description = response.changes.description;
          }

          this.identity = this.user;
          localStorage.setItem('identity', JSON.stringify(this.identity));
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

  //Metodo de subida de imagen
  avatarUpload(datos) {
    let data = JSON.parse(datos.response);
    console.log(data);

    this.user.image = data.image;
  }

}
