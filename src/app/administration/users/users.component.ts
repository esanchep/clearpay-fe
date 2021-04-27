import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/shared/components/table/table.models';
import { Response } from '../../shared/models/response.models';
import { UserLiteral } from './users.literals';
import { User } from './users.models';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    '../administration.sections.scss',
    './users.component.scss'
  ]
})
export class UsersComponent implements OnInit, OnDestroy {
  public users: User[];
  public columns: Column[] = [
    { id: 'username', label: UserLiteral.username },
    { id: 'name', label: UserLiteral.name },
    { id: 'surname', label: UserLiteral.surname }
  ];
  public literal = UserLiteral;
  private usersSubscription: Subscription;

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.usersSubscription = this.userService.getAllUsers()
      .subscribe((response: Response<User[]>) => {
        this.users = [...response.body];
      });
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}
