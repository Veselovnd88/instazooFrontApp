import {Injectable} from '@angular/core';
import {User} from "../models/User";

const TOKEN_KEY = "auth-token";

const USER_KEY = "auth-user";

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {


  constructor() {
  }

  public saveToken(token: string): void {
    console.log("save token")
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let item = window.sessionStorage.getItem(TOKEN_KEY);
    console.log("get token :"+ item)
    // @ts-ignore
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    // @ts-ignore
    JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public logout(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }
}
