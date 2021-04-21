import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserLiteral } from './users.literals';
import { GetUsersResponse as GetUsersResponse, User } from './users.models';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[];
  public displayedColumns = ['username', 'name', 'surname'];
  public literal = UserLiteral;
  public filter = "";
  private usersSubscription: Subscription;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.usersSubscription = this.userService.getAllUsers()
      .subscribe((response: GetUsersResponse) => {
        console.log(response)
        this.users = [...response.users];
      });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}
