import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {UserService} from "../../service/user.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public profileEditForm: FormGroup;

  // @ts-ignore
  constructor(private dialogRef: MatDialogRef<EditUserComponent>,
              private fb: FormBuilder,
              private notificationService: NotificationService,
              //@ts-ignore
              @Inject(MAT_DIALOG_DATA) public data,
              private userService: UserService
  ) {
  }

  createProfileForm(): FormGroup {
    return this.fb.group({
      firstname: [this.data.user.firstname, Validators.compose([Validators.required])],
      lastname: [this.data.user.lastname, Validators.compose([Validators.required])],
      bio: [this.data.user.bio, Validators.compose([Validators.required])],
    })
  }

  submit(): void {
    this.userService.updateUser(this.updateUser()).subscribe(
      {
        next: () => {
          this.notificationService.showSnackBar("User data was updated");
          this.dialogRef.close();
        }
      }
    )
  }

  private updateUser(): User {
    this.data.user.firstname = this.profileEditForm.value.firstname;
    this.data.user.lastname = this.profileEditForm.value.lastname;
    this.data.user.bio = this.profileEditForm.value.bio;
    return this.data.user;

  }

  closeDialog() {
    this.dialogRef.close();
  }


  ngOnInit(): void {
    this.profileEditForm = this.createProfileForm();
  }

}
