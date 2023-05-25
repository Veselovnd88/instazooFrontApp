import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {

  public authForm: FormGroup;

  public authTitle = "Welcome to InstaZoo, please, register and join us";

  ngOnInit(): void {
    this.authForm = this.createFormAuth();
  }

  createFormAuth(): FormGroup {
    return new FormGroup({
      username: new FormControl<string>('',
        [Validators.required]),
      password: new FormControl<string>('',
        [Validators.required]),
      confirmPassword: new FormControl<string>('',
        [Validators.required])
    })
  }

  public submit(): void {
    console.log("Submit pressed")
  }

}
