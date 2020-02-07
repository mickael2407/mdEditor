import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../interface/category';
import { API } from '../constants/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  public category: Category[];
  constructor(private httpClient: HttpClient) {
    this.category = [];
  }


  getAllCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(API.URL + API.CAT.GET_ALL);
  }

  getCategoryNameById(catId: string): Category {
    return this.category.filter(_cat => _cat.idCat === catId)[0];
  }
}
