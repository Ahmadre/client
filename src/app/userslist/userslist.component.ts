import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/user';
import { UsersService } from '../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
    'contactphone'
  ];
  dataSource = new MatTableDataSource<any>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: User[] = [];

  constructor(private userService: UsersService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getAllUsers();
    this.dataSource.data = this.users;
  }

  onPhoneTap(phonenr: number): void {
    const call = `tel:${phonenr}`;
    window.open(call, '_blank');
  }
}
