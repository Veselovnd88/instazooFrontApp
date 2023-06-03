import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const USER_API = 'http://localhost:6060/api/v1/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }


  public getUserById(id: number): Observable<any> {
    return this.http.get(USER_API + "/" + id);
  }

  public getCurrentUser(): Observable<any> {
    console.log(this.http);
    return this.http.get(USER_API);
  }

  public updateUser(user: any): Observable<any> {
    return this.http.post(USER_API + '/update', user);
  }


}
