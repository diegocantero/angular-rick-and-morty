import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { faSearch, faClock, faX } from '@fortawesome/free-solid-svg-icons';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  of,
  Observable,
} from 'rxjs';
import { HistorySearch } from 'src/app/models/history-search';
import { SessionStorageService } from 'src/app/services/session-storage/session-storage.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output()
  searchChange = new EventEmitter<string>();
  word = new Subject();

  history: Observable<HistorySearch[]> = of([]);

  searching = false;
  faSearch = faSearch;
  faClock = faClock;
  faX = faX;

  constructor(private sessionService: SessionStorageService) {}

  ngOnInit(): void {
    this.getHistorySearches();
    this.word
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((text: any) => {
        this.searchChange.emit(text);
        this.registryHistory(text);
        this.getHistorySearches();
      });
  }

  getHistorySearches() {
    let response = this.sessionService.getAll();
    let history = response.map((x) => {
      console.log();
      return JSON.parse(x) as HistorySearch;
    });
    history.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      return 1;
    });
    this.history = of(history.splice(0, 4));
  }

  searchQuery(event: KeyboardEvent) {
    let queryParam = event.target as HTMLInputElement;
    this.searching = true;
    if (queryParam.value === '') {
      this.searching = false;
    }
    this.word.next(queryParam.value);
  }

  registryHistory(query: string) {
    if (query?.trim() === '' || query === null || query === undefined) {
      return;
    }
    let data: HistorySearch = {
      query: query,
      date: this.getDate(),
    };
    this.sessionService.create(JSON.stringify(data));
  }

  clearSearch() {
    this.word.next('');
    this.searching = false;
  }

  getDate(): string {
    var today = new Date();
    var now = today.toUTCString();
    return now;
  }
}
