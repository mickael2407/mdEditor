import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/api';
import { Doc } from '../interface/doc';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  public docs: Doc[];
  constructor(private httpClient: HttpClient) {
    this.docs = [];
  }

  getAllDocsByUser(userId: string): Observable<Doc[]> {
    return this.httpClient.get<Doc[]>(API.URL + `${API.DOC.USER}${userId}`)
  }

  postDocs(doc: Doc) {
    return this.httpClient.post<any>(API.URL + API.DOC.NEW, doc);
  }

  getContentByDocId(docId: string): Observable<{content: string}> {
    return this.httpClient.get<{content: string}>(API.URL + `${API.DOC.CONTENT}${docId}`);
  }

}
