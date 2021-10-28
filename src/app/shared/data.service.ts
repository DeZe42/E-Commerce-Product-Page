import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  cart$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }
}