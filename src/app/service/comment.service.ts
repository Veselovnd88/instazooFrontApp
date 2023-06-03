import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const COMMENT_API = "http://localhost:6060/api/v1/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  public addCommentToPost(postId: number | undefined, message: string): Observable<any> {
    return this.http.post(COMMENT_API + '/' + postId + '/create', {
      message: message
    });
  }

  public getCommentsToPost(postId: number): Observable<any> {
    return this.http.get(COMMENT_API + '/' + postId);
  }

  public delete(commentId: number): Observable<any> {
    return this.http.delete(COMMENT_API + '/' + commentId + '/delete');
  }

}
