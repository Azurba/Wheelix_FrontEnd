import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailsService {

  _email? : string;
  private isLoggedIn = false;

  constructor(private http : HttpClient) { }

  getRentalByCode(code : string){
    this.http.get(`https://localhost:7220/api/Rental/track/${code}`);
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
            this.isLoggedIn = true;
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

  isAuthenticated(){
    return this.isLoggedIn;
  }
}
