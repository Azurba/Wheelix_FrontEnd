import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RentalOrder } from '../Model/RentalOrder';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailsService {

  rentalCode : string;

  constructor(private http : HttpClient, private _snackBar: MatSnackBar) {
    this.rentalCode = '';
  }

  getRentalByCode(code: string): Observable<RentalOrder> {
    return this.http.get<RentalOrder>(`https://localhost:7220/api/Rental/track/${code}`);
  }

  deleteRentalByCode(code : string) : Observable<any>{
    return this.http.delete(`https://localhost:7220/api/Rental/${code}`);
  }

  public login(trackingCode: string, email: string): Observable<string> {
    const request = { trackingCode, email };

    return this.http.post("https://localhost:7220/api/Rental/login", request, { responseType: 'text' })
      .pipe(
        map((response: string) => {
          const responseBody = JSON.parse(response);
          if (responseBody.message === "Login successful") {
            return response;
          } else {
            throw new Error("Invalid tracking code or email");
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this._snackBar.open('Invalid tracking code or email.', 'Close', { duration: 30000, horizontalPosition: 'center', verticalPosition: 'bottom' });
          return throwError(() => error);
        })
      );
  }
}
