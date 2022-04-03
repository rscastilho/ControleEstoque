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
  itensCarrinho: any;
  produto: Produto[]=[]
  
  constructor(private router: Router) { }



  ngOnInit(): void {
    this.pegarItensCarrinho =localStorage.getItem(('comprar'));
    this.itensCarrinho =JSON.parse(this.pegarItensCarrinho);
    console.log(this.itensCarrinho)



  }

  limparCarrinho(){
    localStorage.removeItem('itens');
    localStorage.removeItem('comprar');
    this.router.navigate(['/home'])

  }

}
