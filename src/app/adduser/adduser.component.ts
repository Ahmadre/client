import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Validators } from '@angular/forms';
import { User } from '../interfaces/user';

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

  constructor() { }

  ngOnInit(): void {
  }

  async addUser(): Promise<void> {
    const user: User = this.form.value;
    console.warn(user);
  }
}
