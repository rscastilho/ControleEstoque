import { Fornecedor } from './../models/Fornecedor';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers : new HttpHeaders({
    'content-type': 'application/json',
    'authorization': `Bearer ${localStorage.getItem('tokenUsuario')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  baseUrl = "https://localhost:5001/api/Fornecedores";


  constructor(private http: HttpClient) { }


  // getAllFornecedores(skip: number, take: number): Observable<Fornecedor[]>{
  //   return this.http.get<Fornecedor[]>(`${this.baseUrl}?skip=${skip}&take=${take}`, httpOptions)
  // }
  getAllFornecedores(): Observable<Fornecedor[]>{
    return this.http.get<Fornecedor[]>(`${this.baseUrl}`, httpOptions)
  }


  getFornecedorById(fornecedorId: number): Observable<Fornecedor>{
    return this.http.get<Fornecedor>(`${this.baseUrl}/${fornecedorId}`, httpOptions)
  }

  getContarFornecedor(): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/contador`, httpOptions)
  }

  postFornecedor(fornecedor:Fornecedor):Observable<Fornecedor>{
    return this.http.post<Fornecedor>(`${this.baseUrl}`, fornecedor, httpOptions)
  }

  putFornecedor(fornecedor:Fornecedor):Observable<Fornecedor>{
    return this.http.put<Fornecedor>(`${this.baseUrl}`, fornecedor, httpOptions)
  }

  deleteFornecedor(fornecedorId: number): Observable<Fornecedor>{
return this.http.delete<Fornecedor>(`${this.baseUrl}/${fornecedorId}`, httpOptions)
  }

}
