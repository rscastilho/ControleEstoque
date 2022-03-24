import { Usuario } from './../models/Usuario';
import { RegistrarUsuario } from './../models/RegistrarUsuario';
import { Login } from './../models/login';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'content-type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('tokenUsuario')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseUrl: string = "https://localhost:5001/api/Usuarios";

  constructor(private http: HttpClient) { }

  private verifica = new BehaviorSubject<string>('');
  itens = this.verifica.asObservable();



  login(login: Login):Observable<any>{
    return this.http.post<Login>(`${this.baseUrl}/login`, login).pipe(take(1));;
  }

  carregarUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl, httpOptions).pipe(take(1));
  }

  carregarUsuarioPorId(id: any): Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`, httpOptions).pipe(take(1));
  }

  registrarUsuario(usuario: RegistrarUsuario): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/registrar`, usuario, httpOptions).pipe(take(1));
  }

  carregarTodosUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseUrl, httpOptions).pipe(take(1));
  }

  carregarUsuariosPorNome(nome: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.baseUrl}/carregarusuariopornome/${nome}`, httpOptions).pipe(take(1));
  }

  atualizarUsuario(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.baseUrl}`, usuario, httpOptions).pipe(take(1));
  }

  excluirUsuario(usuarioId: number): Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/${usuarioId}`, httpOptions).pipe(take(1));
  }

  quantidadeCarrinho(): Observable<string>{
    let items = JSON.stringify(localStorage.getItem('itens'));
    this.verifica.next(items);
    return this.itens

  }






}
