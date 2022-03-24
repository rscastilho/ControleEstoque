import { UsuarioService } from './../../../services/usuario.service';
import { ComprasProdutosComponent } from './../../produto/compras-produtos/compras-produtos.component';
import { CategoriaService } from './../../../services/categoria.service';
import { Categoria } from './../../../models/categoria';
import { AutorizaService } from './../../../services/auth.service';

import { Router } from '@angular/router';
import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl:'./layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit, DoCheck {
  verificaToken = localStorage.getItem('tokenUsuario');
  emailLogado = localStorage.getItem('emailLogado');
  usuarioId = localStorage.getItem('usuarioId');
  carrinho = localStorage.getItem('carrinho');
  perfil: string = '';
  panelOpenState = false;
  categorias: Categoria[]=[]
  opened: boolean=true;
  numeroItens: any;
  numero =0;
  quantidade : any;

  constructor(
    private router: Router,
    private autorizaService: AutorizaService,
    private catetegoriaService: CategoriaService,
    private usuarioService: UsuarioService

  ) {}

  ngDoCheck(): void {
    this.usuarioService.quantidadeCarrinho().subscribe(({
      next: (resultado)=>{this.quantidade = resultado}
    }))
  }

  ngOnInit(): void {
    //verifica o perfil e habilita ou nao o menu lateral
    switch (this.autorizaService.VerificaAdministrador()) {
      case 0:
        this.perfil = '(Administrador)';
        this.opened=true;
        break;
      case 1:
        this.perfil = '(Fornecedor)';
        break;
      case 2:
        this.perfil = '(Cliente)';
        this.opened=false;
        break;
      case 3:
        this.perfil = '(Funcionario)';
        break;
      case 4:
        this.perfil = '(Visitante)';
        this.opened=false;
        break;
    }

    this.catetegoriaService.getAllCAtegorias().subscribe(({
      next:(resultado)=> {this.categorias = resultado},
      error:()=>{},
      complete:()=>{}
    }))


    this.quantidade = localStorage.getItem('itens')

  }

  logoff() {
    localStorage.clear();
    this.router.navigate(['login']);
  }


}
