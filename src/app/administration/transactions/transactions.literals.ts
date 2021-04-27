import { Literal } from 'src/assets/i18n/literals';

const COMMON = Literal.common;
const TRANSACTIONS = Literal.administration.transactions;

export const TransactionLiteral = {
  amount: COMMON.amount,
  comment: COMMON.comment,
  sourceWallet: TRANSACTIONS.sourceWallet,
  destinationWallet: TRANSACTIONS.destinationWallet,
  title: TRANSACTIONS.title,
  date: TRANSACTIONS.date
};
