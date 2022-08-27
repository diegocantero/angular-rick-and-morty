import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Subject, debounceTime, auditTime, map, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  @Output()
  searchChange = new EventEmitter<string>();

  faSearch = faSearch

  word = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.word
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((text: any) => {
        this.searchChange.emit(text);
      });
  }

  search(event: KeyboardEvent) {
    let queryParam = event.target as HTMLInputElement;
    this.word.next(queryParam.value);
  }
}
