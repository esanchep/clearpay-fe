import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Column, Row, TableEntity } from './table.models';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: TableEntity[];
  @Input() set columns(columnList: Column[]) {
    this.columnList = columnList;
  }
  @Input() showToolbar = false;
  @Input() selectedRow: TableEntity;
  @Output() selectedRowChange = new EventEmitter<TableEntity>();
  public filter: string;
  public columnList: Column[];

  constructor(
    private currencyPipe: CurrencyPipe,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
  }

  getDisplayedColumns(): string[] {
    return this.columnList?.map((column: Column) => column.id);
  }

  isNumber(data: any): boolean {
    return typeof data === 'number';
  }

  formatAmount(data: number): string {
    return this.currencyPipe.transform(data, 'USD', 'symbol', '1.2-2');
  }

  isDate(data: any): boolean {
    return data instanceof Date || !!Date.parse(data);
  }

  formatDate(data: Date): string {
    return this.datePipe.transform(data, 'longDate');
  }

  onRowClick($row: TableEntity): void {
    this.selectedRowChange.emit($row);
  }

  isSelectedRow($row: TableEntity): boolean {
    return this.selectedRow?.id === $row?.id;
  }

}
