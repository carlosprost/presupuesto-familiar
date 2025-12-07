import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Egreso } from './egreso.interface';

@Injectable({
  providedIn: 'root'
})
export class EgresoService {

  constructor(private http: HttpClient) { }

  getEgresos() {
    return this.http.get<Egreso[]>('http://localhost:3000/egreso');
  }

  postEgreso(egreso: Egreso) {
    return this.http.post<Egreso[]>('http://localhost:3000/egreso', egreso);
  }

  deleteEgreso(id: number) {
    return this.http.delete<number>(`http://localhost:3000/egreso/${id}`);
  }

  putEgreso(egreso: Egreso) {
    return this.http.put<Egreso>('http://localhost:3000/egreso', egreso);
  }
}
