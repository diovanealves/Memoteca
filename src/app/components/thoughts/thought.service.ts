import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http"
import { Thought } from './thought';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThoughtService {

  private readonly API = "http://localhost:3000/thoughts"
  constructor(private http: HttpClient) {}

  list(page: number, filter: string, favorite: boolean): Observable<Thought[]>{
    const thoughtPerPage = 9;
    let params = new HttpParams().set("_page", page).set("_limit", thoughtPerPage)

    if(filter.trim().length > 2){
      params = params.set("q", filter)
    }

    if(favorite){
      params = params.set("favorite", true)
    }

    return this.http.get<Thought[]>(this.API, { params })
  }

  create(thought: Thought): Observable<Thought>{
    return this.http.post<Thought>(this.API, thought)
  }

  edit(thought: Thought): Observable<Thought>{
    const url = `${this.API}/${thought.id}`
    return this.http.put<Thought>(url, thought)
  }

  exclude(id: number): Observable<Thought>{
    const url = `${this.API}/${id}`
    return this.http.delete<Thought>(url)
  }

  findById(id: number): Observable<Thought>{
    const url = `${this.API}/${id}`
    return this.http.get<Thought>(url)
  }

  changeFavorite(thought: Thought): Observable<Thought>{
    thought.favorite = !thought.favorite
    return this.edit(thought)
  }
}
