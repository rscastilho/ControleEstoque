import { TokenUser } from './../models/tokenUser';
import { Produto } from './../models/Produto';
import { Observable } from 'rxjs';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    // 'Authorization':`Bearer ${localStorage.getItem('tokenUsuario')}`
    'Authorization':`Bearer ${localStorage.getItem('tokenUsuario')}`
  })
};


@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  baseUrl = 'https://localhost:5001/api/Produtos';
  teste = JSON.stringify(localStorage.getItem('tokenUsuario'))

  constructor(private http:HttpClient) { }

  getAllProdutos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.baseUrl, httpOptions)
  }


  getAllProdutoById(produtoId: number): Observable<Produto>{
    return this.http.get<Produto>(`${this.baseUrl}/pesquisarporid/${produtoId}`, httpOptions)
  }

  getProdutoByName(nomeProduto: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/pesquisarpornome/${nomeProduto}`, httpOptions)
  }

  getImagemDestaque(): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/imagemdestaque`, httpOptions);
  }

  postProduto(produto: Produto): Observable<any>{
     return this.http.post<Produto>(`${this.baseUrl}`, produto, httpOptions)
  }

  // postProduto(produto: Produto, file : File[]): Observable<Produto>{
  //   const fileToUpload = file[0] as File;
  //    const formData = new FormData();
  //    formData.append('file', fileToUpload)
  //   return this.http.post<Produto>(`${this.baseUrl}`, [produto, formData], httpOptions)

  // }

  salvaImagem(file : File[]): Observable<Produto>{
   
     const fileToUpload = file[0] as File;
       const formData = new FormData();
       formData.append('file', fileToUpload)
       return this.http.post<Produto>(`${this.baseUrl}/salvarimagem`, formData)


  }

  putImagemDestaque(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(`${this.baseUrl}/imagemdestaque`, produto, httpOptions)
  }

  putProduto(produto: Produto): Observable<Produto>{
    return this.http.put<Produto>(`${this.baseUrl}`, produto, httpOptions)
  }

  getProdutosByCategoriaId(categoriaId: number): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}/produtosporcategoria/${categoriaId}`, httpOptions)
  }


}
