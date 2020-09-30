import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(private http: HttpClient) { }

  async getAllUsers(): Promise<User[]>  {
    return this.http.get<User[]>(`${config.base}/users/all`).toPromise<User[]>();
  }

  async addUser(input: any): Promise<User[]>  {
    return this.http.get<User[]>(`${config.base}/users/all`).toPromise<User[]>();
    /* return this.http.post<User>(`${config.base}/users/create`, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    ).toPromise<User>(); */
  }

  
}
