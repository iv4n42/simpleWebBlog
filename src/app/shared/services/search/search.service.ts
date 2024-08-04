import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public allOptions$  = new BehaviorSubject<string[]>([]);
  public searchOptions$  = new BehaviorSubject<string[]>([]);
  public finalOption$  = new BehaviorSubject<string>("")

  constructor() { }
}
