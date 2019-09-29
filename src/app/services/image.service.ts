import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../../globals';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) {}

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', image.name);
    formData.append('image', image);

    return this.http.post(`${BACKEND_URL}/image-upload`, formData);
  }
}
