import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPStackAPI } from '../Model/IPStackAPI';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http : HttpClient) { }

  public getApiKey() : Observable<IPStackAPI[]>{
    return this.http.get<IPStackAPI[]>("https://localhost:7220/api/IPStackAPI");
  }
}
