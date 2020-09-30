import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  form = this.fb.group({
    email: ['', Validators.required],
    language: [''],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    birthdate: ['', Validators.required],
    contactphone: ['', Validators.required],
  });

  selectedUser = new FormControl(null);
  users: User[] = [];

  constructor(private userService: UsersService, private fb: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getAllUsers();
  }

  selectUser(user: User): void {
    this.form.controls.email.setValue(user.email);
    this.form.controls.language.setValue(user.language);
    this.form.controls.firstname.setValue(user.firstname);
    this.form.controls.lastname.setValue(user.lastname);
    this.form.controls.birthdate.setValue(user.birthdate);
    this.form.controls.contactphone.setValue(user.contactphone);
  }

  async updateUser(): Promise<void> {
    const user: User = this.form.value;
    const result: User = await this.userService.updateUser(user);

    if (result) {
      this.userService.showAlertDialog(
        'Benutzer aktualisiert',
        `Daten des Benutzers: ${result.email}, mit der ID: ${result.id} wurden erfolgreich aktualisiert.`
      );
    }
  }
}
