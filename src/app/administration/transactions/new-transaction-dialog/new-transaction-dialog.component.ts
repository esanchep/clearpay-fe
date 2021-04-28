import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  form: FormGroup;
  literal = NewTransactionLiteral;
  eligibleDestinationUsers: User[];
  eligibleDestinationWallets: Wallet[];
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
    this.destinationWalletControl().disable();
    this.amountControl().disable();
  }

  private getWalletList(walletList: Wallet[]): Wallet[] {
    if (this.sourceUserIdControl().value !== this.destinationUserIdControl().value) {
      return walletList;
    }
    return walletList?.filter((wallet: Wallet) => wallet.id !== this.sourceWalletIdControl().value);
  }

  onDestinationUserSelected(): void {
    const destinationUserId: string = this.destinationUserIdControl().value;
    this.destinationWalletControl().enable();
    this.store.dispatch(fromNewTransactionActions.getDestinationWalletsByUserId({ userId: destinationUserId }));
    this.setAmountFieldEditable();
  }

  onDestinationWalletSelected($selectedWalletChange: MatSelectChange): void {
    this.selectedDestinationWalletBalance = $selectedWalletChange.value.balance;
    const destinationWalletBalance = this.destinationWalletControl().value?.balance;
    this.sourceBalanceControl().setValue(this.selectedSourceWalletBalance);
    this.destinationBalanceControl().setValue(destinationWalletBalance);
    this.amountControl().setValue(0);
    this.setAmountFieldEditable();
  }

  private setAmountFieldEditable(): void {
    if (!this.areDestinationUserAndWalletSelected()) {
      this.amountControl().disable();
      return;
    }
    this.amountControl().enable();
  }

  updateBalances(): void {
    const amount = this.amountControl().value;
    if (this.areDestinationUserAndWalletSelected()) {
      this.sourceBalanceControl().setValue(this.selectedSourceWalletBalance - amount);
      this.sourceBalanceControl().markAsTouched();
      this.destinationBalanceControl().setValue(this.selectedDestinationWalletBalance + amount);
    }
  }

  private areDestinationUserAndWalletSelected(): boolean {
    return this.destinationUserIdControl().value && this.destinationWalletControl().value;
  }

  getTransaction(): Transaction {
    const newTransaction = {
      sourceWalletId: this.sourceWalletIdControl().value,
      destinationWalletId: this.destinationWalletControl().value?.id,
      amount: this.amountControl().value,
      date: new Date(),
      comment: this.commentControl().value
    };
    return newTransaction;
  }

  hasError(formControlName: string, errorType: string): boolean {
    return this.control(formControlName).hasError(errorType);
  }

  private sourceUsernameControl(): AbstractControl {
    return this.control('sourceUsername');
  }

  private sourceUserIdControl(): AbstractControl {
    return this.control('sourceUserId');
  }

  private destinationUserIdControl(): AbstractControl {
    return this.control('destinationUserId');
  }

  private sourceWalletIdControl(): AbstractControl {
    return this.control('sourceWalletId');
  }

  private sourceWalletNameControl(): AbstractControl {
    return this.control('sourceWalletName');
  }

  private destinationWalletControl(): AbstractControl {
    return this.control('destinationWallet');
  }

  private sourceBalanceControl(): AbstractControl {
    return this.control('sourceBalance');
  }

  private destinationBalanceControl(): AbstractControl {
    return this.control('destinationBalance');
  }

  private amountControl(): AbstractControl {
    return this.control('amount');
  }

  private commentControl(): AbstractControl {
    return this.control('comment');
  }

  private control(formControlName: string): AbstractControl {
    return this.form.get(formControlName);
  }

  isValidForm(): boolean {
    return this.form.valid;
  }

  ngOnDestroy(): void {
    this.store.dispatch(fromNewTransactionActions.resetDestinationWallets());
    this.newTransactionSubscription.unsubscribe();
  }

}
