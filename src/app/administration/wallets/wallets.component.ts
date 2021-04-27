import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/shared/components/table/table.models';
import { fromWalletsActions } from './../../store/actions';
import { fromUsersSelectors, fromWalletsSelectors } from './../../store/selectors';
import { RootState } from './../../store/states/root.state';
import { User } from './../users/users.models';
import { WalletLiteral } from './wallets.literals';
import { Wallet } from './wallets.models';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: [
    './../administration.sections.scss',
    './wallets.component.scss'
  ]
})
export class WalletsComponent implements OnInit, OnDestroy {
  public wallets: Wallet[];
  public columns: Column[] = [
    { id: 'alias', label: WalletLiteral.alias },
    { id: 'balance', label: WalletLiteral.balance },
  ];
  public literal = WalletLiteral;
  private walletsSubscription: Subscription;

  constructor(private store: Store<RootState>) { }

  ngOnInit(): void {
    this.walletsSubscription = this.store.pipe(select(fromUsersSelectors.selectSelectedUSer))
      .subscribe((selectedUser: User) => {
        if (!!selectedUser) {
          this.store.dispatch(fromWalletsActions.getWalletsByUserId({ userId: selectedUser.id }));
        }
      });

    this.walletsSubscription.add(this.store.pipe(select(fromWalletsSelectors.selectAllWallets))
      .subscribe((walletList: Wallet[]) => this.wallets = walletList)
    );
  }

  onRowSelected($selectedWallet: Wallet): void {
    this.store.dispatch(fromWalletsActions.setSelectedWallet($selectedWallet));
  }

  ngOnDestroy(): void {
    this.walletsSubscription.unsubscribe();
  }

}
