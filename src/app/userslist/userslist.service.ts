import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';

import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserslistService {

  constructor(private http: HttpClient) { }

  async getAllUsers(): Promise<User[]>  {
    return this.http.get<User[]>(`${config.base}/users/all`).toPromise<User[]>();
  }
}
