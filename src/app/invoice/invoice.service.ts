import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IInvoice } from './invoice.interface';

@Injectable({ providedIn: 'root' })
export class InvoiceService {
  constructor(private http: HttpClient) {}

  fetchInvoicesPaginated(page: string): Observable<IInvoice[]> {
    const params = new HttpParams().set('page', page);
    return this.http.get<IInvoice[]>('/api/invoice', { params });
  }
  fetchInvoiceById(invoiceId: number): Observable<IInvoice> {
    return this.http.get<IInvoice>(`/api/invoice/detail/${invoiceId}`);
  }
  newInvoice(invoice: IInvoice): Observable<IInvoice> {
    return this.http.post<IInvoice>('/api/invoice/', invoice);
  }
}
