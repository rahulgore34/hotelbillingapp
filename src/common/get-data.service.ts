import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class GetDataService {
  constructor(private http: HttpClient) {}
  getData(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.baseUrl}foodmenu`);
  }

  getBillData(): any[] {
    return localStorage.getItem('billData') ? JSON.parse(localStorage.getItem('billData')) : [];
  }
  addBillData(data) {
    localStorage.setItem('billData',JSON.stringify(data));
  }
}
