import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Column } from './../../shared/components/table/table.models';
import { fromNewTransactionActions, fromTransactionsActions, fromWalletsActions } from './../../store/actions';
import { fromUsersSelectors, fromWalletsSelectors } from './../../store/selectors';
import { RootState } from './../../store/states/root.state';
import { NewTransactionDialogComponent } from './../transactions/new-transaction-dialog/new-transaction-dialog.component';
import { Transaction } from './../transactions/transactions.models';
import { User } from './../users/users.models';
import { WalletLiteral } from './wallets.literals';
import { Wallet } from './wallets.models';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: [
    './../administration.sections.scss',
    './wallets.component.scss'
  ]
})
export class WalletsComponent implements OnInit, OnDestroy {
  public wallets: Wallet[];
  public columns: Column[] = [
    { id: 'alias', label: WalletLiteral.alias },
    { id: 'balance', label: WalletLiteral.balance },
  ];
  public literal = WalletLiteral;
  public selectedWallet: Wallet;
  public selectedUser: User;
  private walletsSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this.walletsSubscription =
      this.store.pipe(select(fromUsersSelectors.selectSelectedUser))
        .subscribe((selectedUser: User) => {
          this.selectedWallet = undefined;
          this.selectedUser = selectedUser;
          if (!!selectedUser) {
            this.store.dispatch(fromWalletsActions.getWalletsByUserId({ userId: selectedUser.id }));
          }
        });

    this.walletsSubscription.add(
      this.store.pipe(select(fromWalletsSelectors.selectAllWallets))
        .subscribe((walletList: Wallet[]) => this.wallets = walletList)
    );
  }

  onRowSelected($selectedWallet: Wallet): void {
    this.selectedWallet = $selectedWallet;
    this.store.dispatch(fromTransactionsActions.resetState());
    this.store.dispatch(fromWalletsActions.setSelectedWallet($selectedWallet));
    this.store.dispatch(fromNewTransactionActions.setSourceWallet($selectedWallet));
  }

  onNewTransaction(): void {
    const dialogRef = this.dialog.open(NewTransactionDialogComponent);
    dialogRef.afterClosed().subscribe((newTransaction: Transaction) => {
      if (!!newTransaction) {
        this.store.dispatch(fromNewTransactionActions.addNewTransaction(newTransaction));
      }
    });
  }

  ngOnDestroy(): void {
    this.walletsSubscription.unsubscribe();
  }

}
