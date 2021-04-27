import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/shared/components/table/table.models';
import { ApiResponse } from './../../shared/models/response.models';
import { NewTransactionDialogComponent } from './new-transaction-dialog/new-transaction-dialog.component';
import { TransactionLiteral } from './transactions.literals';
import { Transaction } from './transactions.models';
import { TransactionsService } from './transactions.service';

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
  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private transactionService: TransactionsService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.transactionService.getTransactionsByWallet('6086b02c570efe822e9e8e4b')
      .subscribe((response: ApiResponse<Transaction[]>) => {
        this.transactions = [...response.body];
      })
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
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((transaction: Transaction) => {
        if (!!transaction) {
          this.subscriptions.push(
            this.transactionService.newTransaction(transaction)
              .subscribe((response: ApiResponse<Transaction>) => {
                if (!!transaction) {
                  this.transactions.push(response.body);
                }
              },
                error => console.error(error)
              )
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    if (!!this.subscriptions) {
      this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
  }

}
