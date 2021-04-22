import { Literal } from './../../../../assets/i18n/literals';

const COMMON = Literal.common;
const NEW_TRANSACTION = Literal.administration.newTransaction;

export const NewTransactionLiteral = {
  title: COMMON.newTransaction,
  from: COMMON.from,
  balance: COMMON.balance,
  amount: COMMON.amount,
  to: COMMON.to,
  user: NEW_TRANSACTION.user,
  wallet: NEW_TRANSACTION.wallet,
  destinationUser: NEW_TRANSACTION.destinationUser,
  destinationWallet: NEW_TRANSACTION.destinationWallet,
  fieldRequired: NEW_TRANSACTION.fieldRequired,
  invalidAmount: NEW_TRANSACTION.invalidAmount,
  cancel: NEW_TRANSACTION.cancel,
  add: NEW_TRANSACTION.add
};
