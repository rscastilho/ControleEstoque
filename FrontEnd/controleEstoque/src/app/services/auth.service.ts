import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TokenUser } from './../models/tokenUser';
import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutorizaService implements CanActivate {
  constructor(private jwtHelper: JwtHelperService,
              private router: Router,
              private snackBar: MatSnackBar) {}

   canActivate(): boolean{
    const token = localStorage.getItem('tokenUsuario');
    if(token?.length != null && !this.jwtHelper.isTokenExpired(token)){
      // this.snackBar.open("Usuario logado com sucesso!", undefined, {panelClass:['sucesso'], duration: 2000})
      return true;
    }
    this.router.navigate(['login']);
    localStorage.clear();
    this.snackBar.open("Sua sessão expirou", undefined, {panelClass:['erro'], duration: 2000})
    return false;
  }


  VerificaAdministrador(): any {
    const checarToken: any = localStorage.getItem('tokenUsuario');
    const traduzTroken = decode<TokenUser>(checarToken);
    switch(traduzTroken.role){
      case 'Administrador':return 0
      break;
      case 'Fornecedor': return 1
      break;
      case 'Cliente': return 2
      break;
      case 'Funcionario': return 3
      break;
      case 'Visitante': return 4
      break;
    }

    // if (traduzTroken.role === 'Administrador') {
    //   return 0;
    // } else if (traduzTroken.role === 'Fornecedor') {
    //   return 1;
    // } else if (traduzTroken.role === 'Cliente') {
    //   return 2;
    // } else if (traduzTroken.role === 'Funcionario') {
    //   return 3;
    // } else if (traduzTroken.role === 'Visitante') {
    //   return 4;
    // }
  }
}
