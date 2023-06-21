import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RentalOrder } from '../Model/RentalOrder';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailsService {

  rentalCode : string;

  constructor(private http : HttpClient) {
    this.rentalCode = '';
  }

  getRentalByCode(code: string): Observable<RentalOrder> {
    console.log(`https://localhost:7220/api/Rental/track/${code}`);
    return this.http.get<RentalOrder>(`https://localhost:7220/api/Rental/track/${code}`);
  }

  deleteRentalByCode(code : string){
    this.http.delete(`https://localhost:7220/api/Rental/${code}`);
  }

  public login(trackingCode: string, email: string): Observable<string> {
    const request = { trackingCode, email };
    console.log("Request: ", request)
    return this.http.post("https://localhost:7220/api/Rental/login", request, { responseType: 'text' })
      .pipe(
        map((response: string) => {
          const responseBody = JSON.parse(response);
          console.log("Response:" , responseBody);
          if (responseBody.message === "Login successful") {
            return response;
          } else {
            throw new Error("Invalid tracking code or email");
          }
        }),
        catchError((error: HttpErrorResponse) => {
          console.log("HTTP Error:", error);
          return throwError(() => error);
        })
      );
  }
}
