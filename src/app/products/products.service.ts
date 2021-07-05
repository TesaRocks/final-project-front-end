import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from './product.interface';
@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}

  fetchProductsPaginated(page: string): Observable<IProduct[]> {
    const params = new HttpParams().set('page', page);
    return this.http.get<IProduct[]>('/api/product', { params });
  }
  fetchProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>('/api/product/all');
  }
  fetchProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`/api/product/${id}`);
  }
  updateProduct(
    id: string | number,
    changes: Partial<IProduct>
  ): Observable<IProduct> {
    return this.http.put<IProduct>(`/api/product/${id}`, changes);
  }
  removeProduct(id: number) {
    return this.http.delete<string>(`/api/product/${id}`);
  }
  newProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('/api/product/', product);
  }
}
