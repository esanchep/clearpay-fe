import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Column } from './../../shared/components/table/table.models';
import { fromNewTransactionActions, fromTransactionsActions, fromUsersActions, fromWalletsActions } from './../../store/actions';
import { fromUsersSelectors } from './../../store/selectors';
import { RootState } from './../../store/states';
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
  users: User[];
  columns: Column[] = [
    { id: 'username', label: UserLiteral.username },
    { id: 'name', label: UserLiteral.name },
    { id: 'surname', label: UserLiteral.surname }
  ];
  literal = UserLiteral;
  selectedUser: User;
  private usersSubscription: Subscription;

  constructor(
    private store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this.store.dispatch(fromUsersActions.getAllUsers());

    this.usersSubscription =
      this.store.pipe(select(fromUsersSelectors.selectAllUsers))
        .subscribe((userList: User[]) => {
          this.selectedUser = undefined;
          this.users = userList;
          this.resetWalletsAndTransactionsStates();
        });
  }

  onRowSelected($SelectedUser: User): void {
    this.selectedUser = $SelectedUser;
    this.resetWalletsAndTransactionsStates();
    this.store.dispatch(fromUsersActions.setSelectedUser($SelectedUser));
    this.store.dispatch(fromNewTransactionActions.setSourceUser($SelectedUser));
  }

  private resetWalletsAndTransactionsStates(): void {
    this.store.dispatch(fromWalletsActions.resetState());
    this.store.dispatch(fromTransactionsActions.resetState());
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }

}
