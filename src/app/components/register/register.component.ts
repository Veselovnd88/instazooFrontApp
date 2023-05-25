import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  public regForm: FormGroup;

  public regTitle = "Welcome to InstaZoo, please, register and join us";

  ngOnInit(): void {
    this.regForm = this.createFormAuth();
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
