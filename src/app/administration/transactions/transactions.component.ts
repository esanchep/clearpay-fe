import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Wallet } from '../wallets/wallets.models';
import { Column } from './../../shared/components/table/table.models';
import { ApiResponse } from './../../shared/models/response.models';
import { fromTransactionsActions } from './../../store/actions';
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
  private transactionsSubscription: Subscription;
  private selectedWallet: Wallet;

  constructor(
    public dialog: MatDialog,
    private store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this.transactionsSubscription =
      this.store.pipe(select(fromWalletsSelectors.selectSelectedWalled))
        .subscribe((selectedWallet: Wallet) => {
          this.selectedWallet = selectedWallet;
          if (!!selectedWallet) {
            this.store.dispatch(fromTransactionsActions.getTransactionsByWalletId({ walletId: selectedWallet.id }));
          }
        });

    this.transactionsSubscription.add(
      this.store.pipe(select(fromTransactionsSelectors.selectAllTransactions))
        .subscribe((transactionList: Transaction[]) => this.transactions = transactionList)
    );
  }

  onNewTransaction(): void {
    const dialogRef = this.dialog.open(NewTransactionDialogComponent, {
      data: {
        fromUser: 'terminator',
        fromWallet: 'One',
        fromBalance: 245.35
      }
    });
    this.transactionsSubscription.add(
      dialogRef.afterClosed().subscribe((transaction: Transaction) => {
        if (!!transaction) {
          // this.transactionsSubscription.add(
          //   this.transactionService.newTransaction(transaction)
          //     .subscribe((response: ApiResponse<Transaction>) => {
          //       if (!!transaction) {
          //         this.transactions.push(response.body);
          //       }
          //     },
          //       error => console.error(error)
          //     )
          // );
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (!!this.transactionsSubscription) {
      this.transactionsSubscription.unsubscribe();
    }
  }

}
