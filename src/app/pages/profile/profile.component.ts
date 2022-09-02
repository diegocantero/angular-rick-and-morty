import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/services/character/character.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  loading: boolean = false;
  id?: string = '';
  character?: Observable<Character>;

  constructor(
    private route: ActivatedRoute,
    private characterService: CharacterService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')?.toString();
    this.getCharacterById();
  }

  getCharacterById() {
    if (this.id !== undefined) {
      this.loading = true;
      this.characterService.getCharacterById(this.id).subscribe(
        (data) => {
          this.character = of(data);
          this.loading = false;
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }
}
