import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { global } from './global';

@Injectable()
export class PostService {

    public url: string;
    public identity: string;
    public token: string;

    constructor(
        private _http: HttpClient
    ) {
        this.url = global.url;
    }

    //Crear nuevo Post
    create(token, post): Observable<any> {
        let json = JSON.stringify(post);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.post(this.url + '/post', params, { headers: headers });
    }

    //Conseguir Posts
    getPosts(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + '/post', { headers: headers });
    }

    //Conseguir Post especifico
    getPost(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

        return this._http.get(this.url + '/post/' + id, { headers: headers });
    }

    //Actualizar post
    update(token, post, id): Observable<any> {
        let json = JSON.stringify(post);
        let params = 'json=' + json;

        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.put(this.url + '/post/' + id, params, { headers: headers });
    }

    //Borrar Post especifico
    delete(token, id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
            .set('Authorization', token);

        return this._http.delete(this.url + '/post/' + id, { headers: headers });
    }
}