import {Component, OnInit} from '@angular/core';
import {Post} from "../../models/Post";
import {User} from "../../models/User";
import {PostService} from "../../service/post.service";
import {UserService} from "../../service/user.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";
import {ImageUploadService} from "../../service/image-upload.service";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isPostsLoaded = false;
  isUserDataLoaded = false;
  posts: Post[];
  user: User;


  constructor(private postService: PostService,
              private userService: UserService,
              private commentService: CommentService,
              private notificationService: NotificationService,
              private imageService: ImageUploadService) {
  }

  ngOnInit(): void {
    console.log("on index page")
    this.postService.getAllPosts()
      .subscribe({
          next: (data) => {
            console.log("All posts are there: " + data);
            this.posts = data;
            this.getImagesToPosts(this.posts);
            this.getCommentsToPosts(this.posts);
            this.isPostsLoaded = true;
          }
        }
      );
    this.userService.getCurrentUser()
      .subscribe({
        next: (data) => {
          console.log(data);
          this.user = data;
          this.isUserDataLoaded = true;
        }
      })

  }

  getImagesToPosts(posts: Post[]): void {
    posts.forEach(p => {
      if (p.id != null) {
        this.imageService.getPostImage(p.id).subscribe({
          next: (data) => {
            p.image = data.imageBytes;
          }
        })
      }
    })
  }

  getCommentsToPosts(posts: Post[]): void {
    posts.forEach(p => {
      if (p.likedUsers == null) {
        p.likedUsers = [];//if array with liked users empty this field is undefined
      }
      if (p.id != null) {
        this.commentService.getCommentsToPost(p.id).subscribe({
          next: (data) => {
            p.comments = data;
          }
        })
      }
    });
  }

  likePost(postId: number | undefined, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);
    // @ts-ignore
    if (!post.likedUsers.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username)
        .subscribe({
          next: () => {
            // @ts-ignore
            post.likedUsers.push(this.user.username);
            console.log("Post liked by " + post.likedUsers);
            this.notificationService.showSnackBar(this.user.username + " liked post");
          }
        });
    } else {
      this.postService.likePost(postId, this.user.username)
        .subscribe({
          next: () => {
            const index = post.likedUsers.indexOf(this.user.username, 0);
            // @ts-ignore
            if (index > -1) {
              // @ts-ignore
              post.likedUsers.splice(index, 1);
              this.notificationService.showSnackBar(this.user.username + " disliked post");
            }
          }
        });
    }
  }

  postComment(event: any, postId: number | undefined, postIndex: number): void {
    const post = this.posts[postIndex];

    let message = (event.target as HTMLInputElement).value;
    // @ts-ignore
    console.log(message)
    this.commentService.addCommentToPost(postId, message)
      .subscribe({
        next: (data) => {
          // @ts-ignore
          post.comments?.push(data);
        }
      });
  }

  formatImage(img: any): any {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg; base64,' + img;
  }

  protected readonly JSON = JSON;
}
