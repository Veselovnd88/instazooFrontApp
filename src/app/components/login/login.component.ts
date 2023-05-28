import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public authTitle = "Welcome to InstaZoo, please, register and join us";

  constructor(private authService: AuthService,
              private tokenService: TokenStorageService,
              private notificationService: NotificationService,
              private router: Router,
              private formBuilder: FormBuilder) {
    if (tokenService.getUser()) {
      this.router.navigate(['main'])
    }
  }

  ngOnInit(): void {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    })
  }

  public submit(): void {
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
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
        this.notificationService.showSnackBar(error.message());

      }
    });
  }

}
