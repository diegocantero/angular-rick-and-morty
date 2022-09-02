import { Component, Input, OnInit } from '@angular/core';
import { Character } from 'src/app/models/character';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { faMars, faQuestion, faVenus } from '@fortawesome/free-solid-svg-icons';
TimeAgo.addDefaultLocale(en);
@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() character: Character | null = null;
  timeAgo = new TimeAgo('en-US');
  faGender = faQuestion;
  constructor() {}

  ngOnInit(): void {
    if (this.character != null  && this.character?.gender !== "unknown" ) {
      this.faGender = this.character.gender === 'Male' ? faMars : faVenus;
    }
  }

  parseToDate(date: Date): string {
    let newDate = this.timeAgo.format(new Date(date));
    return newDate;
  }
}
