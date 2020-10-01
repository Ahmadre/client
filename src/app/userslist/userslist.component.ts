import { AfterViewChecked, AfterViewInit, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'id',
    'email',
    'language',
    'firstname',
    'lastname',
    'birthdate',
    'contactphone',
    'options'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: User[] = [];

  constructor(private userService: UsersService, private snackBar: MatSnackBar) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getAllUsers();
    this.dataSource.data = this.users;
  }

  async confirmRemove(user: User): Promise<void> {
    const confirmed: MatDialogRef<boolean> = this.userService.showConfirmDialog('Sind Sie sicher?', `Möchten Sie ${user.firstname} ${user.lastname} wirklich löschen?`);
    const dialogResult = await confirmed.afterClosed().toPromise();

    if (dialogResult) {
      await this.deleteUser(user);
    }
  }

  async deleteUser(user: User): Promise<void> {
    const result = await this.userService.deleteUser(user);

    if (result) {
      this.snackBar.open('Benutzer entfernt', 'OK');

      this.users = await this.userService.getAllUsers();
      this.dataSource.data = this.users;
    }
  }

  onPhoneTap(phonenr: number): void {
    const call = `tel:${phonenr}`;
    window.open(call, '_blank');
  }

  onEmailTap(email: string): void {
    const call = `mailto:${email}`;
    window.open(call, '_blank');
  }
}
