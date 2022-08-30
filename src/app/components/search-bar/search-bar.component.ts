import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
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
  showHistory = false;
  faSearch = faSearch;
  faClock = faClock;
  faX = faX;
  @ViewChild('search')
  searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private sessionService: SessionStorageService<HistorySearch>,
    private ref: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onGlobalClick(event: Event): void {
    let items = event.composedPath() as HTMLElement[];
    let itemHistory = items.find(
      (x) => x.className === 'item-history' || x.className === 'search-btn'
    );
    if (
      !this.ref.nativeElement.contains(event.target) &&
      itemHistory === undefined
    ) {
      this.showHistory = false;
    }
  }

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
    let history = response.map((x: string) => {
      console.log();
      return JSON.parse(x) as HistorySearch;
    });

    history.sort((a: HistorySearch, b: HistorySearch) => {
      if (a.date > b.date) {
        return -1;
      }
      return 1;
    });
    this.history = of(history.splice(0, 4));
  }

  searchQuery(event: KeyboardEvent) {
    this.showHistory = false;
    let queryParam = event.target as HTMLInputElement;
    this.searching = true;
    if (queryParam.value === '') {
      this.showHistory = true;
      this.searching = false;
    }
    this.word.next(queryParam.value);
  }

  registryHistory(query: string) {
    if (query?.trim() === '' || query === null || query === undefined) {
      return;
    }
    let data: HistorySearch = {
      id: '',
      query: query,
      date: this.getDate(),
    };
    this.sessionService.create(data);
  }

  clearSearch() {
    this.searchInput.nativeElement.value = '';
    this.word.next('');
    this.searching = false;
    this.showHistory = false;
    this.getHistorySearches();
  }

  searchHistory(key:string){
    this.showHistory = false;
    this.searching = true;
    this.word.next(key);
    this.searchInput.nativeElement.value = key;
  }

  show() {
    this.showHistory = true;
    this.getHistorySearches();
  }

  deleteRegistry(key: string) {
    this.sessionService.delete(key);
    this.getHistorySearches();
  }

  getDate(): string {
    var today = new Date();
    var now = today.toUTCString();
    return now;
  }
}
