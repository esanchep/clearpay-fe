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

  constructor() { }

  ngOnInit(): void {
  }

  onFilter(): void {
    // TODO
  }

  onRowClick(row: Row): void {
    this.selectedRowIndex = row.index;
    this.selectedRow.emit(row.data);
  }

  isSelectedRow(index: number): boolean {
    return this.selectedRowIndex === index;
  }

}
