import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInvoice, IInvoiceDetail } from './invoice-invoiceDetail.interface';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpClient) {}

  fetchInvoicesPaginated(page: string): Observable<IInvoice[]> {
    const params = new HttpParams().set('page', page);
    return this.http.get<IInvoice[]>('/api/invoice', { params });
  }
  fetchInvoiceDetail(invoiceId: number): Observable<IInvoiceDetail[]> {
    return this.http.get<IInvoiceDetail[]>(`/api/invoice/detail/${invoiceId}`);
  }
}
