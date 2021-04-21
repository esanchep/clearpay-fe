import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from '../shared/components/table/table.module';
import { AdministrationComponent } from './administration.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { UsersComponent } from './users/users.component';
import { WalletsComponent } from './wallets/wallets.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    TranslateModule
  ],
  declarations: [
    AdministrationComponent,
    TransactionsComponent,
    UsersComponent,
    WalletsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AdministrationModule { }
