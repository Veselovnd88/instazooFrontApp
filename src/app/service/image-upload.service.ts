import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

const IMAGE_API = "http://localhost:6060/api/v1/image";

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

  constructor(private http: HttpClient) {
  }

  public uploadImageToUser(file: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    return this.http.post(IMAGE_API + '/upload', uploadData);
  }

  public uploadImageToPost(file: File, postId: number | undefined): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('file', file);
    console.log("Image service works")
    return this.http.post(IMAGE_API + "/" + postId + "/upload", uploadData);
  }

  public getProfileImage(): Observable<any> {
    return this.http.get(IMAGE_API + "/profile");
  }

  public getPostImage(postId: number): Observable<any> {
    return this.http.get(IMAGE_API + "/post/" + postId);
  }

}
