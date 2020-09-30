import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogData } from '../classes/dialogdata';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.scss']
})
export class AdduserComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(''),
    language: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    birthdate: new FormControl(''),
    contactphone: new FormControl('')
  });

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
  }

  async addUser(): Promise<void> {
    const user: User = this.form.value;
    const result: User = await this.userService.addUser(user);

    if (result) {
      this.form.reset();
      this.userService.showAlertDialog(
        'Benutzer erstellt',
        `Der Benutzer: ${result.email} wurde mit der ID: ${result.id} erfolgreich angelegt.`
      );
    }
  }


}
