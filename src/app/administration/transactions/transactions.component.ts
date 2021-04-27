import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Wallet } from '../wallets/wallets.models';
import { Column } from './../../shared/components/table/table.models';
import { fromNewTransactionActions, fromTransactionsActions } from './../../store/actions';
import { fromTransactionsSelectors, fromWalletsSelectors } from './../../store/selectors';
import { RootState } from './../../store/states';
import { NewTransactionDialogComponent } from './new-transaction-dialog/new-transaction-dialog.component';
import { TransactionLiteral } from './transactions.literals';
import { Transaction } from './transactions.models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: [
    './../administration.sections.scss',
    './transactions.component.scss'
  ]
})
export class TransactionsComponent implements OnInit, OnDestroy {
  public transactions: Transaction[];
  public columns: Column[] = [
    { id: 'sourceWalletId', label: TransactionLiteral.sourceWallet },
    { id: 'destinationWalletId', label: TransactionLiteral.destinationWallet },
    { id: 'amount', label: TransactionLiteral.amount },
    { id: 'date', label: TransactionLiteral.date },
    { id: 'comment', label: TransactionLiteral.comment }
  ];
  public readonly literal = TransactionLiteral;
  public selectedTransaction: Transaction;
  private transactionsSubscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this.transactionsSubscription =
      this.store.pipe(select(fromWalletsSelectors.selectSelectedWalled))
        .subscribe((selectedWallet: Wallet) => {
          this.selectedTransaction = undefined;
          if (!!selectedWallet) {
            this.store.dispatch(fromTransactionsActions.getTransactionsByWalletId({ walletId: selectedWallet.id }));
          }
        });

    this.transactionsSubscription.add(
      this.store.pipe(select(fromTransactionsSelectors.selectAllTransactions))
        .subscribe((transactionList: Transaction[]) => this.transactions = transactionList)
    );
  }

  onRowSelected($selectedTransaction): void {
    this.selectedTransaction = $selectedTransaction;
  }

  ngOnDestroy(): void {
    if (!!this.transactionsSubscription) {
      this.transactionsSubscription.unsubscribe();
    }
  }

}
