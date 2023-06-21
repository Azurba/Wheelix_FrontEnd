import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailsService {

  

  constructor(private http : HttpClient) { }

  getRentalByCode(code : string){
    this.http.get(`https://localhost:7220/api/Rental/track/${code}`);
  }

  deleteRentalByCode(code : string){
    this.http.delete(`https://localhost:7220/api/Rental/${code}`);
  }

}
