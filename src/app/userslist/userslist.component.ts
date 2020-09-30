import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../interfaces/user';
import { UserslistService } from './userslist.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-userslist',
  templateUrl: './userslist.component.html',
  styleUrls: ['./userslist.component.scss']
})
export class UserslistComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'email',
    'language',
    'firstname',
    'lastname',
    'birthdate',
    'contactphone'
  ];
  dataSource = new MatTableDataSource<User>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: User[] = [];

  constructor(private userService: UserslistService) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getAllUsers();
  }

}
