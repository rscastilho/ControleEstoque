import { Carrinho } from './../../../models/carrinho';
import { CarrinhoService } from './../../../services/carrinho.service';
import { Router } from '@angular/router';
import { Produto } from './../../../models/Produto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrinho-usuario',
  templateUrl: './carrinho-usuario.component.html',
  styleUrls: ['./carrinho-usuario.component.css']
})
export class CarrinhoUsuarioComponent implements OnInit {

  pegarItensCarrinho: any;
  itensCarrinho: Carrinho[]=[];
  produto: Produto[]=[]

  constructor(private router: Router,
              public carrinhoService:CarrinhoService) { }

  ngOnInit(): void {
    this.itensCarrinho = this.carrinhoService.exibirCarrinho();
    let quantidade = this.itensCarrinho.length
    localStorage.setItem('itens', JSON.stringify(quantidade))
    }

  aumentarQuantidade(produto: Carrinho){
    this.carrinhoService.aumentarQuantidade(produto)
  }

  diminuiQuantidade(produto: Carrinho){
    this.carrinhoService.diminuiQuantidade(produto);
  }

  limparCarrinho(){
    localStorage.removeItem('itens');
    localStorage.removeItem('comprar');
    this.router.navigate(['/home'])

  }

}
