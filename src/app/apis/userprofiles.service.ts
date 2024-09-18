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
    profile: any): Observable<any> {
    return this.http.post(`${URL} + 'sendUserDetails`, {
      profile: profile,
      nickname: profile.nickname,
      gender: profile.nickname,
      dateofbirth: profile.dateofbirth
    })
  }

}
