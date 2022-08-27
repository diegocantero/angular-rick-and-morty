import { Component, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character.service';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: Observable<Character[]> = of([]);
  notFound: boolean = false;
  loading: boolean = false;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.loading = true;
    this.characterService.getCharacters().subscribe(characters => {
      this.notFound = false;
      this.characters = of(characters.results)
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notFound = true;
      this.characters = of([])
    });
  }

  searchChangeLisenter(query: string): void {
    this.loading = true;
    this.characterService.search(query).subscribe(characters => {
      this.notFound = false;
      this.characters = of(characters.results)
      this.loading = false;
    },
      error => {
        this.loading = false;
        this.notFound = true;
        this.characters = of([])
      });
  }
}
