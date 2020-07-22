import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';
import { global } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {

  public title = 'blog-angular';
  public identity;
  public token;
  public url;

  constructor(
    public _userService: UserService
  ) {
    this.loadUser();
    this.url = global.url;
  }

  ngOnInit() {
    console.log('WebApp ejecutandose');
  }

  //Comprueba el estado de la logica constantemente (cambios)
  ngDoCheck() {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

}
