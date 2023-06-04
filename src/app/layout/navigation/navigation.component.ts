import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {UserService} from "../../service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn = false;
  isDataLoaded = false; //html template loaded before User initialization, so we need to check if it loaded or not
  user: User;


  constructor(private tokenService: TokenStorageService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      console.log("Nav bar: User logged in, getting user info");
      this.userService.getCurrentUser()
        .subscribe({
            next: (data) => {
              this.user = data;
              this.isDataLoaded = true;
            }
          }
        )
    }
  }

  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/login']);
  }


}
