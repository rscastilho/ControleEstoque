import { Perfil } from './../models/perfil';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('tokenUsuario')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  baseUrl ='https://localhost:5001/api/Perfis';

  constructor(private http: HttpClient) { }

  carregarPerfis(): Observable<Perfil[]>{
    return this.http.get<Perfil[]>(this.baseUrl, httpOptions )
  }

  carregarPerfilPorId(id: number): Observable<Perfil>{
    return this.http.get<Perfil>(`${this.baseUrl}/${id}`, httpOptions)
  }

  SalvarPerfil(perfil:Perfil): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}`, perfil, httpOptions)
  }

}
