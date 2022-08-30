import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {Characters } from '../../models/character';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  constructor(private http: HttpClient) { }

  search(query: string): Observable<Characters> {
    return this.http.get<Characters>(`${environment.API_URL}/character?name=${query}`);
  }

  getCharacters(): Observable<Characters> {
    return this.http.get<Characters>(`${environment.API_URL}/character`);
  }
}
