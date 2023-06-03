import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const AUTH_API = "http://localhost:6060/api/v1/auth";

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

  public register(user: {
    password: any; confirmPassword: any; username: any; email: any; firstname: any; lastname: any
  }): Observable<any> {
    return this.http.post(AUTH_API + '/signup', {
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      confirmPassword: user.confirmPassword
    })
  }


}
