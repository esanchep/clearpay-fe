export const Literal = {
  app: {
    title: 'app.title'
  },
  common: {
    newTransaction: 'common.new-transaction',
    balance: 'common.balance',
    from: 'common.from',
    amount: 'common.amount',
    to: 'common.to',
    comment: 'common.comment'
  },
  administration: {
    title: 'administration.title',
    users: {
      title: 'administration.users.title',
      username: 'administration.users.username',
      name: 'administration.users.name',
      surname: 'administration.users.surname',
      errorGettingUsers: 'administration.users.error-getting-users'
    },
    wallets: {
      title: 'administration.wallets.title',
      alias: 'administration.wallets.alias',
      errorGettingWallets: 'administration.wallets.error-getting-wallets'
    },
    transactions: {
      title: 'administration.transactions.title',
      date: 'administration.transactions.date',
      sourceWallet: 'administration.transactions.sourceWallet',
      destinationWallet: 'administration.transactions.destinationWallet',
      errorGettingTransactions: 'administration.transactions.error-getting-transactions'
    },
    newTransaction: {
      user: 'administration.new-transaction.user',
      wallet: 'administration.new-transaction.wallet',
      cancel: 'administration.new-transaction.cancel',
      add: 'administration.new-transaction.add',
      fieldRequired: 'administration.new-transaction.field-required',
      invalidAmount: 'administration.new-transaction.invalid-amount',
      transactionHasBeenSuccessfullyAdded: 'administration.new-transaction.transaction-has-been-successfully-added',
      errorGettingWallets: 'administration.new-transaction.error-getting-wallets',
      errorAddingNewTransaction: 'administration.new-transaction.error-adding-new-transaction'
    }
  }
};
