import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { config } from '../config';
import { catchError } from 'rxjs/operators';
import { never, Observable, throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { DialogData } from '../classes/dialogdata';
import { title } from 'process';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    reportProgress: true,
  };

  constructor(private http: HttpClient, private dialog: MatDialog) { }

  async getAllUsers(): Promise<User[]> {
    return this.http.get<User[]>(`${config.base}/users/all`)
    .pipe<User[]>(catchError(error => this.handleError(error)))
    .toPromise<User[]>();
  }

  async addUser(newUser: User): Promise<User> {
    return this.http.post<User>(`${config.base}/users/create`, newUser, this.httpOptions)
      .pipe<User>(catchError(error => this.handleError(error)))
      .toPromise<User>();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      this.showAlertDialog(`Error: ${error.status}`, error.error.message);
      console.error('An error occurred: ', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      this.showAlertDialog(`Error: ${error.status}`, error.error.message);
      console.error(
        `Backend returned code ${error.status}, ` +
        `message: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Error while creating a new user. Please try again later.');
  }

  public async showAlertDialog(dialogTitle: string, dialogMessage: string): Promise<void> {
    this.dialog.open(DialogContentComponent, {
      data: new DialogData({
        title: dialogTitle,
        message: dialogMessage
      })
    });
  }


}
