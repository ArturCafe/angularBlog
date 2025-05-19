import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../../models/category';
import { map, tap } from 'rxjs/operators';
import { GetCategoriesResponse } from '../../models/get-categories-response';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  
 
  private api = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }


/*
  getAll(): Observable<Category[]> {
    return this.http.get<GetCategoriesResponse>(`${this.api}/category/get-category`)
      .pipe(
        //   tap(res => console.log('Full API Response:', res)),
        map(res => res.category)
      );
  }

*/
getAllCategories(): Observable<Category[]> {
  return this.http.get<Category[]>(this.api); // Returnează un Observable de tip Category[]
}
getAll(): Observable<Category[]> {
  return this.http.get<{ category: Category[] }>(`${this.api}/category/get-category`)
    .pipe(map(response => response.category)); // Map to get the 'category' array
}



  create(category: { name: string }): Observable<Category> {
    return this.http.post<Category>(`${this.api}/category/create-category`, category);
  }

  update(_id: string, category: { name: string }): Observable<Category> {
    return this.http.put<Category>(`${this.api}/category/update-category/${_id}`, category);
  } 

  delete(_id: string): Observable<any> {
    return this.http.delete(`${this.api}/category/delete-category/${_id}`);
  }
  
 
}
