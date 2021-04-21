import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WalletLiteral } from './wallets.literals';
import { GetWalletsResponse, Wallet } from './wallets.models';
import { WalletService } from './wallets.service';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: [
    '../administration.sections.scss',
    './wallets.component.scss'
  ]
})
export class WalletsComponent implements OnInit {
  public wallets: Wallet[];
  public displayedColumns = ['walletName', 'balance'];
  public literal = WalletLiteral;
  public filter = "";
  private walletsSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletsSubscription = this.walletService.getAllWallets()
      .subscribe((response: GetWalletsResponse) => {
        this.wallets = [...response.wallets];
      });
  }

  ngOnDestroy(): void {
    this.walletsSubscription.unsubscribe();
  }

}
