import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../products/product.interface';
@Injectable({ providedIn: 'root' })
export class LikesService {
  constructor(private http: HttpClient) {}

  fetchLikesByUserId(id: string): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/api/likes/${id}`);
  }
  fetchLikeByProductId(productId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`/api/likes/select/${productId}`);
  }
  newLike(productId: number, userId: number): Observable<string> {
    return this.http.post<string>('/api/likes/', { productId, userId });
  }
  deleteLike(productId: number, userId: number): Observable<string> {
    return this.http.delete<string>(`/api/likes/${userId}/${productId}`);
  }
}
