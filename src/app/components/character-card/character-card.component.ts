import { Component, OnInit,Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})

export class CharacterCardComponent implements OnInit {
  @Input() character: Character | null = null;
  logo = environment.LOGO;
  constructor() {
  }

  ngOnInit(): void {

  }

}
