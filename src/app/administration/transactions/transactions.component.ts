import { NewTransactionDialogComponent } from './new-transaction-dialog/new-transaction-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TransactionLiteral } from './transactions.literals';
import { GetTransactionsResponse, NewTransactionRequest, Transaction } from './transactions.models';
import { TransactionService } from './transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: [
    '../administration.sections.scss',
    './transactions.component.scss'
  ]
})
export class TransactionsComponent implements OnInit {
  public transactions: Transaction[];
  public displayedColumns = ['from', 'to', 'amount', 'date', 'balance'];
  public literal = TransactionLiteral;
  public filter = "";
  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private transactionService: TransactionService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.transactionService.getTransactionsByWallet({ walletId: '2' })
      .subscribe((response: GetTransactionsResponse) => {
        this.transactions = [...response.transactions];
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
      dialogRef.afterClosed().subscribe((transaction: NewTransactionRequest) => {
        if (!!transaction) {
          this.subscriptions.push(
            this.transactionService.newTransaction(transaction).subscribe(
              result => {
                if (!!transaction) {
                  this.transactions = [...result.transactions]
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
