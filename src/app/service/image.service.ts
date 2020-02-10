import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Image } from '../interface/image';
import { API } from '../constants/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  public userImages: Image[];
  constructor(private httpClient: HttpClient) { }

  public newImage(imageB64: string | ArrayBuffer, userId: string): Observable<Image> {
    return this.httpClient.post<Image>(`${API.URL}${API.IMG.NEW}`, {
      img: imageB64,
      userId: userId
    });
  }
}
