import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TransactionLiteral } from './transactions.literals';
import { GetTransactionsResponse, Transaction } from './transactions.models';
import { TransactionService } from './transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  public transactions: Transaction[];
  public displayedColumns = ['from', 'to', 'amount', 'date', 'balance'];
  public literal = TransactionLiteral;
  public filter = "";
  private transactionsSubscription: Subscription;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.transactionsSubscription = this.transactionService.getTransactionsByWallet({ walletId: '2' })
      .subscribe((response: GetTransactionsResponse) => {
        console.log(response)
        this.transactions = [...response.transactions];
      });
  }

  ngOnDestroy(): void {
    this.transactionsSubscription.unsubscribe();
  }

}
