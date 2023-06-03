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
            console.log(data);
            this.posts = data;
            this.isPostsLoaded = true;
            this.getImagesToPosts(this.posts);
            this.getCommentsToPosts(this.posts);
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
    if (!post.userLiked.includes(this.user.username)) {
      this.postService.likePost(postId, this.user.username)
        .subscribe({
          next: () => {
            // @ts-ignore
            post.userLiked.push(this.user.username);
            this.notificationService.showSnackBar("Liked!")
          }
        });
    } else {
      this.postService.likePost(postId, this.user.username)
        .subscribe({
          next: () => {
            const index = post.userLiked?.indexOf(this.user.username, 0);
            // @ts-ignore
            if (index > -1) {
              // @ts-ignore
              post.userLiked?.splice(index, 1);
            }
          }
        });
    }
  }

  postComment(message: string, postId: number | undefined, postIndex: number): void {
    const post = this.posts[postIndex];
    console.log(post);
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

}
