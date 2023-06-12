import {Component, OnInit} from '@angular/core';
import {PostService} from "../../service/post.service";
import {Post} from "../../models/Post";
import {ImageUploadService} from "../../service/image-upload.service";
import {CommentService} from "../../service/comment.service";
import {NotificationService} from "../../service/notification.service";

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  userPostsLoaded: boolean = false;
  posts: Post[];

  constructor(private postService: PostService,
              private imageService: ImageUploadService,
              private commentService: CommentService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.postService.getPostForCurrentUser().subscribe({
      next: (data) => {
        this.posts = data;
        this.loadComments(this.posts);
        this.loadImages(this.posts);
        this.userPostsLoaded = true;
      }
    });
  }

  loadImages(posts: Post[]) {
    posts.forEach(p => {
      if (p.id != null) {
        this.imageService.getPostImage(p.id).subscribe({
          next: (im) => {
            p.image = im.imageBytes
          }
        });
      }
    });
  }

  loadComments(posts: Post[]) {
    posts.forEach(p => {
      if (p.id != null) {
        this.commentService.getCommentsToPost(p.id).subscribe({
          next: (c) => {
            p.comments = c;
          }
        });
      }
    })
  }

  removePost(post: Post, index: number): void {
    console.log(post);
    const result = confirm("Do you want to delete this post");
    if (result) {
      this.postService.delete(post.id).subscribe({
        next: () => {
          this.posts.splice(index, 1);
          this.notificationService.showSnackBar("Post deleted");
        }
      });
    }
  }

  deleteComment(commentId: number, postIndex: number, commentIndex: number): void {
    const post = this.posts[postIndex];

    this.commentService.delete(commentId).subscribe({
        next: () => {
          this.notificationService.showSnackBar("Comment deleted");
          post.comments.splice(commentIndex, 1);
        }
      }
    );
  }

  formatImage(img: any) {
    if (img == null) {
      return null;
    }
    return 'data:image/jpeg; base64,' + img;
  }

}
