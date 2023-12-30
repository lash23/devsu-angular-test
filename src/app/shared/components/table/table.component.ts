import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  IActionTrigger,
  ITableAction,
  ITableColumn,
} from '../../../interfaces/ITable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() columns: ITableColumn[] = [];
  @Input() set inputItems(value: any[]) {
    this._items = value;
    this.itemsCopy = value;
    this.buidPagination(this._items);
  }
  @Output() actionTrigger = new EventEmitter<IActionTrigger>();

  get inputItems(): any[] {
    return this._items;
  }

  public showPerPage = 5;
  public startAt = 0;
  public endsAt = this.showPerPage;
  public _items: any[] = [];
  public itemsCopy: any[] = [];
  public totalpages: number[] = [];
  public currentPage = 1;

  onShowPerPage(event: any) {
    this.showPerPage = +event.target.value;
    this.currentPage = 1;
    this.buidPagination(this._items);
  }

  buidPagination(items: any[]) {
    const count = items.length;
    let pages = Math.ceil(count / this.showPerPage);

    if (isNaN(pages) || pages < 1) {
      pages = 1;
    }

    this.totalpages = Array(pages);
    this.changePage();
  }

  onNavPagination(value: number) {
    if (value === this.currentPage) return;

    this.currentPage = value;

    this.changePage();
  }

  changePage() {
    const offset = (this.currentPage - 1) * this.showPerPage;

    this.startAt = offset;
    this.endsAt = this.startAt + this.showPerPage;
  }

  onSearch(searchTerm: string) {
    if (searchTerm.length === 0) {
      this._items = [...this.itemsCopy];
    }

    this._items = this.itemsCopy.filter((i) =>
      i.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.buidPagination(this._items);
  }

  onActionClick(action: ITableAction, item: any) {
    this.actionTrigger.emit({ action, item });
  }

  handleImageError(event: any) {
    event.target.src = '../../../../assets/images/bank.png';
  }
}
