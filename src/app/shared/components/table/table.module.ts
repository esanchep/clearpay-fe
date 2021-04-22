import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  exports: [TableComponent],
  providers: [
    CurrencyPipe,
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TableModule { }
