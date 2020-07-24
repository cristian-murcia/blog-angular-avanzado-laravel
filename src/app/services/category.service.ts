import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { global } from '../services/global';

@Injectable()
export class CategoryService {

    public url: string;
    public identity: string;
    public token: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    //Crear categoria Peticion
    create(token, category): Observable<any> {
        let json = JSON.stringify(category);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + '/category', params, { headers: headers });
    }

    //Traer todas las categorias
    getCategories(): Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + '/category', { headers: headers });
    }


}