import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Row, TableEntity } from './table.models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: TableEntity[];
  @Input() displayedColumns: string[];
  @Output() selectedRow = new EventEmitter<TableEntity>();
  public filter: string;
  private selectedRowIndex: number;

  constructor(
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  onFilter(): void {
    // TODO
  }

  isNumber(data: any): boolean {
    return typeof data === 'number';
  }

  formatAmount(data: number): string {
    return this.currencyPipe.transform(data, 'USD', 'symbol', '1.2-2');
  }

  isDate(data: any): boolean {
    return data instanceof Date;
  }

  formatDate(data: Date): string {
    return this.datePipe.transform(data, 'longDate');
  }

  onRowClick(row: Row): void {
    this.selectedRowIndex = row.index;
    this.selectedRow.emit(row.data);
  }

  isSelectedRow(index: number): boolean {
    return this.selectedRowIndex === index;
  }

}
