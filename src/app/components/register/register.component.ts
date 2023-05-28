import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../service/auth.service";
import {TokenStorageService} from "../../service/token-storage.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;

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
    this.registerForm = this.createRegisterForm();
  }

  createRegisterForm(): FormGroup {
    return this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstname: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    })
  }

  public submit(): void {
    this.authService.register({
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname,
      password: this.registerForm.value.password,
      confirmPassword: this.registerForm.value.confirmPassword
    }).subscribe({
      next: (data) => {
        console.log(data);
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data);
        this.notificationService.showSnackBar("Successfully registered in");
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
