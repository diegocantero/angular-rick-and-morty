import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Characters } from '../models/character';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  search(query: string): Observable<Characters> {
    return this.http.get<Characters>(`https://rickandmortyapi.com/api/character?name=${query}`);
  }

  constructor(private http: HttpClient) { }

  getCharacters(): Observable<Characters> {
    return this.http.get<Characters>('https://rickandmortyapi.com/api/character');
  }
}
