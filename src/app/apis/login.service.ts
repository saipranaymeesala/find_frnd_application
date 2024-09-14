import { Injectable } from '@angular/core';
import { RequsetService } from './requset-service';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL: string = 'http://localhost:9090/api/';

  constructor(private req: RequsetService, private http: HttpClient) { }

  public sendOTP(userEmail: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.URL}` + 'sendOtp', { userEmail: userEmail }, { observe: 'response' });
  }

  public verifyOTP(userOtp: any): Observable<HttpResponse<any>> {
    return this.http.post(`${this.URL}` + 'verifyOTPs', { userOtp: userOtp }, { observe: 'response' });
  }

  getFF(): Observable<any> {
    return this.req.getData()
  }
}
