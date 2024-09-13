import { Injectable } from '@angular/core';
import { RequsetService } from './requset-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private req:RequsetService ) { }
  getFF():Observable<any>
  {
    return this.req.getData()
  }
}
