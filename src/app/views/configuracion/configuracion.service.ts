import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuracion } from './configuracion.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private apiUrl = 'http://localhost:3000/config';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Configuracion> {
    return this.http.get<Configuracion>(this.apiUrl);
  }

  updateConfig(config: Configuracion): Observable<Configuracion> {
    return this.http.put<Configuracion>(this.apiUrl, config);
  }
}
