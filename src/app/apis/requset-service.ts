import { HttpClient } from "@angular/common/http"
import { Request } from "./request"
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
@Injectable
(
    {
        providedIn:'root'
    }
)

export class RequsetService implements Request {
    title:any;
    private readonly GET:any="http://64.227.191.74:9090/api"
    constructor(private http:HttpClient){}
    public getData():Observable<any>
    {
return this.http.get<any>(`${this.GET}/example`);
    }
}
