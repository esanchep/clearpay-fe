import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
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
  private initialData: NewTransactionDialogInputData;

  constructor(
    @Inject(MAT_DIALOG_DATA) data: NewTransactionDialogInputData,
    private formBuilder: FormBuilder
  ) {
    this.initialData = data;
    this.buildForm(data);
    this.mockData(); // TODO remove when store implemented
  }


  private buildForm(data: NewTransactionDialogInputData): void {
    this.form = this.formBuilder.group({
      fromUserId: [data.fromUserId],
      fromUsername: [data.fromUsername],
      fromWalletId: [data.fromWalletId],
      fromWalletName: [data.fromWalletName],
      fromBalance: [data.fromBalance, Validators.min(0)],
      amount: [0, [Validators.required, Validators.min(0.1)]],
      toUser: [undefined, Validators.required],
      toWallet: [undefined, Validators.required],
      toBalance: [undefined]
    });
  }

  private mockData(): void {
    this.form.get('fromUsername').setValue('terminator');
    this.form.get('fromWalletName').setValue('wallet_1');
  }

  ngOnInit(): void {
    this.initFormState();
    this.updateBalances();
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
