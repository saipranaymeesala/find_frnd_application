import { Injectable, OnInit } from '@angular/core';
import { RequsetService } from './requset-service';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  private URL: string = 'http://localhost:3000/api/';

  constructor(private req: RequsetService, private http: HttpClient,private router:Router) { }


  public sendOTP(userEmail: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.URL}email/sendEmail`, { userEmail: userEmail }, { observe: 'response' });
  }
  


  public verifyOTP(userOtp: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.URL}` + 'email/verifyOTP', { userOtp: userOtp }, { observe: 'response' });
  }
ngOnInit(): void {
  if(localStorage.getItem("isActive"))
    {
      this.router.navigate(['/tabs'])
      console.log("data")
    }

}
  
}
