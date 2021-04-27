import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { fromNewTransactionSelectors } from './../../../store/selectors';
import { RootState } from './../../../store/states';
import { NewTransactionState } from './../../../store/states/new-transaction.state';
import { Transaction } from './../transactions.models';
import { NewTransactionDialogInputData } from './new-transaction-dialog-models';
import { NewTransactionLiteral } from './new-transaction-dialog.literals';

@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.scss']
})
export class NewTransactionDialogComponent implements OnInit {
  public form: FormGroup;
  public literal = NewTransactionLiteral;
  private newTransactionSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this.newTransactionSubscription = this.store.pipe(select(fromNewTransactionSelectors.selectNewTransaction))
      .subscribe((newTransaction: NewTransactionState) => {
        this.buildForm(newTransaction);
        this.initFormState();
      });

    this.updateBalances();
  }

  private buildForm(data: NewTransactionState): void {
    this.form = this.formBuilder.group({
      fromUserId: [data.sourceUser.id],
      fromUsername: [data.sourceUser.username],
      fromWalletId: [data.sourceWallet.id],
      fromWalletName: [data.sourceWallet.alias],
      fromBalance: [data.sourceWallet.balance, Validators.min(0)],
      amount: [0, [Validators.required, Validators.min(0.1)]],
      toUser: [undefined, Validators.required],
      toWallet: [undefined, Validators.required],
      toBalance: [undefined]
    });
  }

  private initFormState(): void {
    this.form.get('fromUsername').disable();
    this.form.get('fromWalletName').disable();
    this.form.get('fromBalance').disable();
    this.form.get('toBalance').disable();
    this.form.get('amount').disable();
  }

  setAmountFieldEditable(): void {
    if (!this.areDestinationUserAndWalletSelected()) {
      this.form.get('amount').disable();
      return;
    }
    this.form.get('amount').enable();
  }

  updateBalances(): void {
    const amount = this.form.get('amount').value;
    if (this.areDestinationUserAndWalletSelected()) {
      this.form.get('toBalance').setValue(amount);
    }
  }

  areDestinationUserAndWalletSelected(): boolean {
    return this.form.get('toUser').value && this.form.get('toWallet').value;
  }

  getTransaction(): Transaction {
    return this.form.value as Transaction;
  }

}
