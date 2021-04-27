import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Column } from 'src/app/shared/components/table/table.models';
import { Response } from '../../shared/models/response.models';
import { WalletLiteral } from './wallets.literals';
import { Wallet } from './wallets.models';
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
  public columns: Column[] = [
    { id: 'alias', label: WalletLiteral.alias },
    { id: 'balance', label: WalletLiteral.balance },
  ];
  public literal = WalletLiteral;
  private walletsSubscription: Subscription;

  constructor(private walletService: WalletService) { }

  ngOnInit(): void {
    this.walletsSubscription = this.walletService.getWalletsByUserId('6086b02c570efe822e9e8e44')
      .subscribe((response: Response<Wallet[]>) => {
        this.wallets = [...response.body];
      });
  }

  ngOnDestroy(): void {
    this.walletsSubscription.unsubscribe();
  }

}
