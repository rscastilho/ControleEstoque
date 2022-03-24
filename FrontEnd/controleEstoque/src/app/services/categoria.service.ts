import { Categoria } from './../models/categoria';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers : new HttpHeaders({
  'content-type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('tokenUsuario')}`
})
};

@Injectable({
  providedIn: 'root'
})


export class CategoriaService {

  baseUrl = "https://localhost:5001/api/Categorias";

  constructor(private http: HttpClient) { }

  getAllCAtegorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.baseUrl}`, httpOptions)
  }

  getCategoriaPorId(categoriaId: number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.baseUrl}/pesquisarporid/${categoriaId}`, httpOptions)
  }

  postCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.post<Categoria>(`${this.baseUrl}`, categoria, httpOptions)
  }

  putCategoria(categoria: Categoria): Observable<Categoria>{
    return this.http.put<Categoria>(`${this.baseUrl}`, categoria, httpOptions)
  }

  deleteCategoria(categoriaId: Number): Observable<Categoria>{
    return this.http.delete<Categoria>(`${this.baseUrl}/${categoriaId}`, httpOptions)
  }
}
