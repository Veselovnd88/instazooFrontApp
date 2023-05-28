import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/User";
import {Observable} from "rxjs";

const AUTH_API = "http://localhost:6666/api/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(user: { username: any, password: any; }): Observable<any> {
    return this.http.post(AUTH_API + '/signin', {
      username: user.username,
      password: user.password
    })
  }

  public register(user: User): Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      confirmPassword: user.confirmPassword
    })
  }


}
