import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient) { }

  public sendProfileDetails(profile:any):Observable<any>
  {

    
  return this.http.post("https://bommanasolutions.in/api/profile/sendprofiledetails",{email:profile.email,gender:profile.gender,dateofbirth:profile.dob,nickname:profile.name})
  }


  public getProfileDetails(email:any):Observable<any>
  {
  return this.http.post("https://bommanasolutions.in/api/profile/getprofiledetails",{email})
  }

}
