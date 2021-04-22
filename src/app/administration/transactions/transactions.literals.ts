import { Literal } from "src/assets/i18n/literals";

const COMMON = Literal.common;
const TRANSACTIONS = Literal.administration.transactions;

export const TransactionLiteral = {
  to: COMMON.to,
  from: COMMON.from,
  amount: COMMON.amount,
  balance: COMMON.balance,
  newTransaction: COMMON.newTransaction,
  title: TRANSACTIONS.title,
  date: TRANSACTIONS.date
};
