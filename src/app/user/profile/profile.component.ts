import {Component, OnInit} from '@angular/core';
import {User} from "../../models/User";
import {TokenStorageService} from "../../service/token-storage.service";
import {PostService} from "../../service/post.service";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {UserService} from "../../service/user.service";
import {data} from "autoprefixer";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isUserDataLoaded: boolean = false;

  user: User;

  selectedFile: File;

  userProfileImage: File;

  previewImageUrl: any;


  constructor(private tokenService: TokenStorageService,
              protected postService: PostService,
              private dialog: MatDialog,
              private notificationService: NotificationService,
              private imageService: ImageUploadService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe({
          next: (data) => {
            this.user = data;
            this.isUserDataLoaded = true;
          }
        }
      );
    this.imageService.getProfileImage()
      .subscribe({
        next: (data) => {
          this.userProfileImage = data.imageBytes;
        }
      });
  }

  // @ts-ignore
  onFileSelected(event): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.previewImageUrl = reader.result;
    };
  }

  openEditDialog(): void {
    const dialogUserEditConfig = new MatDialogConfig();
    dialogUserEditConfig.width = '400px';
    dialogUserEditConfig.data = {
      user: this.user
    }
    this.dialog.open(EditUserComponent, dialogUserEditConfig);
  }

  onUpload(): void {
    if (this.selectedFile != null) {
      this.imageService.uploadImageToUser(this.selectedFile)
        .subscribe({
          next: (data) => {
            this.notificationService.showSnackBar("Image uploaded");
          }
        });
    }
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg; base64,' + img;
  }

}
