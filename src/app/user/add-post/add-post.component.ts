import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {ImageUploadService} from "../../service/image-upload.service";
import {NotificationService} from "../../service/notification.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/Post";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  postForm: FormGroup;
  selectedFile: File;
  isPostCreated: boolean = false;
  createdPost: Post;
  previewImageUrl: any;

  constructor(private postService: PostService,
              private imageService: ImageUploadService,
              private notificationService: NotificationService,
              private router: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.postForm = this.createPostForm();
  }

  createPostForm(): FormGroup {
    return this.fb.group({
      title: ['', Validators.compose([Validators.required])],
      caption: ['', Validators.compose([Validators.required])],
      location: ['', Validators.compose([Validators.required])],
    });
  }

  public submit(): void {
    this.postService.createPost({
      title: this.postForm.value.title,
      caption: this.postForm.value.caption,
      location: this.postForm.value.location,
      likes: 0,
      likedUsers: null,
      comments: null

    }).subscribe({
      next: (data) => {
        this.createdPost = data;
        console.log("post created");
        console.log(data);

        if (this.createdPost != null) {
          console.log("image uploaded for the post " + this.createdPost.id);
          this.imageService.uploadImageToPost(this.selectedFile, this.createdPost.id);
          this.imageService.uploadImageToUser(this.selectedFile);
          console.log(this.selectedFile);
          this.isPostCreated = true;
          this.notificationService.showSnackBar("Post created");
        }
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
    }
  }


}
