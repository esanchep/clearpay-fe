import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { User } from '../../users/users.models';
import { fromNewTransactionActions } from './../../../store/actions';
import { fromNewTransactionSelectors, fromUsersSelectors } from './../../../store/selectors';
import { RootState } from './../../../store/states';
import { NewTransactionState } from './../../../store/states/new-transaction.state';
import { Wallet } from './../../wallets/wallets.models';
import { Transaction } from './../transactions.models';
import { NewTransactionLiteral } from './new-transaction-dialog.literals';

@Component({
  selector: 'app-new-transaction-dialog',
  templateUrl: './new-transaction-dialog.component.html',
  styleUrls: ['./new-transaction-dialog.component.scss']
})
export class NewTransactionDialogComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public literal = NewTransactionLiteral;
  public eligibleDestinationUsers: User[];
  public eligibleDestinationWallets: Wallet[];
  private newTransactionSubscription: Subscription;
  private selectedSourceWalletBalance: number;
  private selectedDestinationWalletBalance: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<RootState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(fromNewTransactionSelectors.selectNewTransaction))
      .subscribe((newTransaction: NewTransactionState) => {
        this.selectedSourceWalletBalance = newTransaction.sourceWallet.balance;
        this.buildForm(newTransaction);
        this.initFormState();
      }).unsubscribe();

    this.newTransactionSubscription =
      this.store.pipe(select(fromUsersSelectors.selectAllUsers))
        .subscribe((userList: User[]) => this.eligibleDestinationUsers = userList);

    this.newTransactionSubscription.add(
      this.store.pipe(select(fromNewTransactionSelectors.selectEligibleDestinationWallets))
        .subscribe((walletList: Wallet[]) => this.eligibleDestinationWallets = this.getWalletList(walletList)));

    this.updateBalances();
  }

  private buildForm(data: NewTransactionState): void {
    this.form = this.formBuilder.group({
      sourceUserId: [data.sourceUser.id],
      sourceUsername: [data.sourceUser.username],
      sourceWalletId: [data.sourceWallet.id],
      sourceWalletName: [data.sourceWallet.alias],
      sourceBalance: [data.sourceWallet.balance, Validators.min(0)],
      amount: [0, [Validators.required, Validators.min(0.1)]],
      comment: [undefined],
      destinationUserId: [undefined, Validators.required],
      destinationWallet: [undefined],
      destinationBalance: [undefined]
    });
  }

  private initFormState(): void {
    this.form.get('sourceUsername').disable();
    this.form.get('sourceWalletName').disable();
    this.form.get('sourceBalance').disable();
    this.form.get('destinationWallet').disable();
    this.form.get('destinationBalance').disable();
    this.form.get('amount').disable();
  }

  private getWalletList(walletList: Wallet[]): Wallet[] {
    if (this.form.get('sourceUserId').value !== this.form.get('destinationUserId').value) {
      return walletList;
    }
    return walletList?.filter((wallet: Wallet) => wallet.id !== this.form?.get('sourceWalletId').value);
  }

  onDestinationUserSelected(): void {
    const destinationUserId: string = this.form.get('destinationUserId').value;
    this.form.get('destinationWallet').enable();
    this.store.dispatch(fromNewTransactionActions.getDestinationWalletsByUserId({ userId: destinationUserId }));
    this.setAmountFieldEditable();
  }

  onDestinationWalletSelected($selectedWalletChange: MatSelectChange): void {
    this.selectedDestinationWalletBalance = $selectedWalletChange.value.balance;
    const destinationWalletBalance = this.form.get('destinationWallet').value?.balance;
    this.form.get('sourceBalance').setValue(this.selectedSourceWalletBalance);
    this.form.get('destinationBalance').setValue(destinationWalletBalance);
    this.form.get('amount').setValue(0);
    this.setAmountFieldEditable();
  }

  private setAmountFieldEditable(): void {
    if (!this.areDestinationUserAndWalletSelected()) {
      this.form.get('amount').disable();
      return;
    }
    this.form.get('amount').enable();
  }

  updateBalances(): void {
    const amount = this.form.get('amount').value;
    if (this.areDestinationUserAndWalletSelected()) {
      this.form.get('sourceBalance').setValue(this.selectedSourceWalletBalance - amount);
      this.form.get('destinationBalance').setValue(this.selectedDestinationWalletBalance + amount);
    }
  }

  areDestinationUserAndWalletSelected(): boolean {
    return this.form.get('destinationUserId').value && this.form.get('destinationWallet').value;
  }

  getTransaction(): Transaction {
    const newTransaction = {
      sourceWalletId: this.form.get('sourceWalletId').value,
      destinationWalletId: this.form.get('destinationWallet').value?.id,
      amount: this.form.get('amount').value,
      date: new Date(),
      comment: this.form.get('comment').value
    };
    return newTransaction;
  }

  ngOnDestroy(): void {
    this.store.dispatch(fromNewTransactionActions.resetDestinationWallets());
    this.newTransactionSubscription.unsubscribe();
  }

}
