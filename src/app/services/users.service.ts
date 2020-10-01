import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { config } from '../config';
import { catchError } from 'rxjs/operators';
import { never, Observable, throwError } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  /**
   * Fetches all `User` instances.
   */
  async getAllUsers(): Promise<User[]> {
    return this.http.get<User[]>(`${config.base}/users/all`)
      .pipe<User[]>(catchError(error => this.handleError(error)))
      .toPromise<User[]>();
  }

  /**
   * Creates a new `User` instance.
   *
   * @param newUser Defines the user to create in the persistence db.
   *
   */
  async addUser(newUser: User): Promise<User> {
    return this.http.post<User>(`${config.base}/users/create`, newUser, this.httpOptions)
      .pipe<User>(catchError(error => this.handleError(error)))
      .toPromise<User>();
  }

  /**
   * Updates an existing `User` instance.
   *
   * @param user Defines the user to update in the persistence db.
   *
   */
  async updateUser(user: User): Promise<User> {
    return this.http.post<User>(`${config.base}/users/${user.email}/update`, user, this.httpOptions)
      .pipe<User>(catchError(error => this.handleError(error)))
      .toPromise<User>();
  }

  /**
   * Deletes an existing `User` instance.
   *
   * @param user Defines the user to delete from the persistence db.
   *
   */
  async deleteUser(user: User): Promise<User> {
    return this.http.get<User>(`${config.base}/users/${user.email}/remove`, this.httpOptions)
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

  public showAlertDialog(dialogTitle: string, dialogMessage: string): void {
    this.dialog.open(DialogContentComponent, {
      data: new DialogData({
        title: dialogTitle,
        message: dialogMessage
      })
    });
  }

  public showConfirmDialog(dialogTitle: string, dialogMessage: string): MatDialogRef<any> {
    return this.dialog.open(DialogContentComponent, {
      data: new DialogData({
        title: dialogTitle,
        message: dialogMessage,
        hasCloseButton: false,
        hasConfirmButtons: true
      })
    });
  }
}
