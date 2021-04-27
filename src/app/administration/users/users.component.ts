import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/shared/components/table/table.models';
import { fromUsersActions } from 'src/app/store/actions';
import { fromUsersSelectors } from 'src/app/store/selectors';
import { RootState } from 'src/app/store/states';
import { UserLiteral } from './users.literals';
import { User } from './users.models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [
    './../administration.sections.scss',
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

  constructor(
    private store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromUsersActions.getAllUsers());

    this.usersSubscription =
      this.store.pipe(select(fromUsersSelectors.selectAllUsers))
        .subscribe((userList: User[]) => this.users = userList);
  }

  onRowSelected($SelectedUser: User): void {
    this.store.dispatch(fromUsersActions.setSelectedUser($SelectedUser));
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}
