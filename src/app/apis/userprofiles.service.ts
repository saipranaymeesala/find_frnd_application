import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserprofilesService {

  constructor(private http: HttpClient) { }

  public sendUserDetails(
    profile: any): Observable<any> {
    return this.http.post('http://localhost:9090/api/sendUserDetails', {
      email: profile.email,
      profile: profile.profile,
      nickname: profile.nickname,
      gender: profile.nickname,
      dateofbirth: profile.dateofbirth
    })
  }

}
