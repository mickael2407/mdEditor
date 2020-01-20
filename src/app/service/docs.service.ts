import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/api';
import { Doc } from '../interface/doc';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  private docs: any[];
  constructor(private httpClient: HttpClient) { }

  getAllDocsByUser(userId: string) {
    return this.httpClient.get(API.URL + API.DOC.USER)
  }

  postDocs(doc: Doc) {
    return this.httpClient.post<any>(API.URL + API.DOC.NEW, doc);
  }
}
