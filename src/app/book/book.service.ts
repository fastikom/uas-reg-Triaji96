import { Injectable } from '@angular/core';
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Book} from "./book";

@Injectable()
export class BookService {
  private headers = new Headers({'Content-Type': 'application/json'});
    private Url = 'http://localhost:8000/api/book';

  constructor(private _http: Http) { }

  getBooks():Observable<Book[]>{
    return this._http.get(this.Url)
      .map(res=> res.json())
      .catch(this.handleError)
  }

  insertBook(buku: Book): Observable<Book> {
    return this._http.post(this.Url, JSON.stringify(buku), { headers: this.headers })
      .map(response => response.json() as Book)
      .catch(this.handleError);
  }

  deletePlayer(player: Book): Observable<any> {
        let updateUrl = `${this.Url}/${player.id}`;
        return this._http.delete(updateUrl)
                        .map(this.success)
                        .catch(this.handleError);
    }

  updatePlayer(player: Book): Observable<any> {
        let updateUrl = `${this.Url}/${player.id}`;

        return this._http.put(updateUrl, JSON.stringify(player), { headers: this.headers })
                        .catch(this.handleError);
    }



  private success(): Observable<any> {
        return Observable.create();
    }

    private handleError(response: Response): Observable<any> {
        let errorMessage = `${response.status} - ${response.statusText}`;
        return Observable.throw(errorMessage);
    }

}
