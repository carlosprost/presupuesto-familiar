import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingreso } from './ingreso.interfaces';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  constructor(private http: HttpClient) { }

  getIngresos() {
    return this.http.get<Ingreso[]>('http://localhost:3000/ingreso');
  }

  postIngreso(ingreso: Ingreso) {
    return this.http.post<Ingreso[]>('http://localhost:3000/ingreso', ingreso);
  }

  deleteIngreso(id: number) {
    return this.http.delete<number>(`http://localhost:3000/ingreso/${id}`);
  }

  putIngreso(ingreso: Ingreso) {
    return this.http.put<Ingreso>('http://localhost:3000/ingreso/', ingreso);
  }
}
