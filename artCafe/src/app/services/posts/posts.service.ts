
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../../models/post';
import { Posts } from '../../models/posts';

@Injectable({ providedIn: 'root' })

export class PostService {




  constructor(private http: HttpClient) { }

  private apiUrl = environment.urlBackend;
  private api = 'http://localhost:8080/api/v1';


addLike(postId: string, userId: string) {
  return this.http.put<Post>(`${this.apiUrl}/v1/posts/like-post/${postId}`, 
    { userId });
}


  createCommentsPost(formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/v1/posts/create-comment`, formData);
  }

  getCommentsByPostId(postId: string): Observable<any> {
 
    return this.http.get<any>(`${this.apiUrl}/v1/posts/get-comments/${postId}`);

  }
  


  createVideoPost(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/v1/posts/create-videopost`, formData);
  }

  createPhotoPost(formData: FormData): Observable<any> {

    
    return this.http.post<any>(`${this.apiUrl}/v1/posts/create-photopost`, formData);
  }




  /*
   getAll(offset: number, limit: number, categoryId?: string): Observable<any> {
   let params = new HttpParams()
     .set('offset', offset.toString())
     .set('limit', limit.toString());
 
   if (categoryId) {
     params = params.set('category', categoryId);
   }
 
   return this.http.get<any>(`${this.api}/posts/get-posts`, { params });
 }
 
 
 
     getAll(offset: number, limit: number): Observable<any> {
       const params = new HttpParams()
         .set('offset', offset.toString())
         .set('limit', limit.toString());
   
       return this.http.get<any>(`${this.api}/posts/get-posts`, { params });
     }
     */
  getAll(offset: number, limit: number,categoryId?: string, name?: string): Observable<any> {
    const params = new HttpParams()
      .set('currentPage', (offset / limit + 1).toString())  // Calculate page number
      .set('limit', limit.toString())
        .set('category', categoryId || '')                    // Optional category filter
      .set('name', name || '');                              // Optional search term for name

    return this.http.get<any>(`${this.api}/posts/get-posts`, { params });
  }


  getPostsCategory(categoryId: string, page: number = 1,


    limit: number = 10): Observable<Posts> {
    console.log(categoryId);

    return this.http.get<Posts>(
      `${this.api}/posts/getcategory-posts/${categoryId}?page=${page}&limit=${limit}`
    );
  }


  /*
      getPostsCategory(id: string, page: number = 1, limit: number = 10): Observable<{ posts: Post[], totalPosts: number }> {
        return this.http.get<{ posts: Post[], totalPosts: number }>(
          `${this.apiUrl}/posts/getcategory-posts/${id}?page=${page}&limit=${limit}`
        );
      }
      
    */
  /*
  this.http.get(`${this.apiUrl}/v1/posts/getcategory-posts/blog?page=1&limit=10`)
    .subscribe((res: any) => {
      console.log('Postări din categoria:', res.posts);
    });
  
  getPostsCategory(id: string): Observable<{ posts: Post[] }> {
    return this.http.get<{ posts: Post[] }>(`${this.api}/posts/getcategory-posts/${id}`);
  }
  */

  getPost(id: string): Observable<{

}> {
    return this.http.get<{ post: Post }>(`${this.api}/posts/get-post/${id}`);
  }

  updatePhoto(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.api}/v1/posts/update-photo/${id}`, formData);
  }

  updateVideo(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.api}/v1/posts/update-video/${id}`, formData);
  }



  deletePost(id: string): Observable<any> {
    return this.http.delete(`${this.api}/v1/posts/delete-post/${id}`);
  }

  // Metoda pentru ștergerea posturilor multiple
  deletePosts(selectedIds: string[]): Observable<any> {
    return this.http.delete(`${this.api}/posts/delete-posts`, {
      body: { selectedIds }
    });
  }

}
