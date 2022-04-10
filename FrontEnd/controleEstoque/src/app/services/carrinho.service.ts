import { ProdutoService } from './produto.service';
import { Router } from '@angular/router';
import { Carrinho } from './../models/carrinho';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  produtos: Carrinho[]=[];
  quantidadeMaxima: number = 0;

  constructor(private router: Router,
    ) { }


  adicionarItensCarrinho(produto: Carrinho){
    let localizaProdutos = this.produtos.find(x => x.id === produto.id);
    if(localizaProdutos){
      localizaProdutos.quantidade +=1;
    }else {
      this.produtos.push(produto);
    }
    
    let quantidadeItensCarrinho = this.produtos.length;
    localStorage.setItem('itens', JSON.stringify(quantidadeItensCarrinho))
  }

  exibirCarrinho(){
    return this.produtos;
  }

  limparCarrinho(){
    this.produtos = [];
    this.router.navigate(['home'])
  }

  quantidadeItensCarrinho(){
    return this.produtos.length
  }

  aumentarQuantidade(produto: Carrinho){
    let localizaItemPedido = this.produtos.find(x => x.id === produto.id);
    if(localizaItemPedido){
             localizaItemPedido.quantidade += 1
      }
}

  diminuiQuantidade(produto: Carrinho){
    let localizaItemPedido = this.produtos.find(x => x.id === produto.id);
    if(localizaItemPedido){
      localizaItemPedido.quantidade -= 1
       }
       if(localizaItemPedido?.quantidade===0){
         this.produtos.splice(this.produtos.indexOf(localizaItemPedido),1)
       }

  }

  ValorTotalPedido(){
    let total: number =0;
    this.produtos.map(x => total = total +(x.valorUnitario * x.quantidade))
    return total;
  }



}
