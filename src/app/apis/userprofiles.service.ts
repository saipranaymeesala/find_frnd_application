import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofilesService {
  private URL: string = 'http://localhost:9090/api/';
  constructor(private http: HttpClient) { }

  public sendUserDetails(
    profile: string,
    nickname: string,
    gender: string,
    dateofbirth: string): Observable<HttpResponse<any>> {
    return this.http.post(`${URL} + 'sendUserDetails`, { profile, nickname, gender, dateofbirth }, { observe: 'response' })
  }

}
