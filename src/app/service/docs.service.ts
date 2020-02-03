import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../constants/api';
import { Doc } from '../interface/doc';
import { Observable } from 'rxjs';
import { Category } from '../interface/category';

@Injectable({
  providedIn: 'root'
})
export class DocsService {

  public docs: Doc[];
  public allDocs: Doc[];
  constructor(private httpClient: HttpClient) {
    this.docs = [];
  }

  getAllDocsByUser(userId: string): Observable<Doc[]> {
    return this.httpClient.get<Doc[]>(API.URL + `${API.DOC.USER}${userId}`)
  }

  postDocs(doc: Doc): Observable<any> {
    return this.httpClient.post<any>(API.URL + API.DOC.NEW, doc);
  }

  getAllDocPublic(): Observable<Doc[]> {
    return this.httpClient.get<Doc[]>(API.URL + API.DOC.ALL);
  }

  getContentByDocId(docId: string): Observable<{content: string}> {
    return this.httpClient.get<{content: string}>(API.URL + `${API.DOC.CONTENT}${docId}`);
  }

  postCategoryDoc(docCat: {docId: string, catId: string}): Observable<any> {
    return this.httpClient.post<any>(API.URL + API.DOC.NEW_CAT, docCat);
  }

  deleteCategoryDoc(docCat: {docId: string, catId: string}): Observable<any> {
    return this.httpClient.delete<any>(API.URL + `${API.DOC.DELETE_CAT}/${docCat.docId}/${docCat.catId}`);
  }

  deleteDoc(docId: string): Observable<any> {
    return this.httpClient.delete<any>(API.URL + `${API.DOC.DELETE}/${docId}`);
  }
}
