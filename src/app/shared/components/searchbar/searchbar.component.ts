import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent {
  @Output() onSearch = new EventEmitter<string>();

  onChange(event: any) {
    const term: string = event.target.value;

    this.onSearch.emit(term);
  }
}
