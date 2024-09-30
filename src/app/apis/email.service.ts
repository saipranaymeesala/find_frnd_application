import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http:HttpClient) { }

  public sendEmail(email:any):Observable<any>
  {
    console.log("called......")
    return this.http.post<Observable<any>>("http://localhost:3000/api/email/sendEmail",{email:email});
  }
}
