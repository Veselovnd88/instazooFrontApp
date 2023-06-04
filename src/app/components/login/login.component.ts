import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {PostService} from "../../service/post.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public authTitle = "Welcome to InstaZoo, please, register and join us";

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              private userService: UserService,
              private postService: PostService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    if (tokenService.getUser()) {
      console.log("user logged in")
      this.router.navigate(['main'])
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    console.log("I create login form")
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  public submit(): void {
    console.log("login")
    this.authService.login({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe({
      next: (data) => {
        console.log(data);
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data);
        this.notificationService.showSnackBar("Succesfully logged in");
        this.router.navigate(['/']);
        // window.location.reload();
      },
      error: (error) => {
        console.log(error);
        this.notificationService.showSnackBar(error.message());

      }
    });
  }

  testButton() {
    this.userService.getCurrentUser()
      .subscribe({
        next: (data) => {
          console.log(data);
          console.log(data.username);
        }
      })
  }

}
