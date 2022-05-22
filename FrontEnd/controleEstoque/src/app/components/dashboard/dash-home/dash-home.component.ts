import { NgxSpinnerService } from 'ngx-spinner';
import { FornecedorService } from './../../../services/fornecedor.service';
import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dash-home',
  templateUrl: './dash-home.component.html',
  styleUrls: ['./dash-home.component.css']
})
export class DashHomeComponent implements OnInit {
  produtosQuantidade: number =0;
  fornecedoresQuantidade: number =0;

  constructor(private produtoService:ProdutoService,
                private fornecedorService: FornecedorService,
                private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.contarProdutos();
    this.contarFornecedor();
  }


  contarProdutos(){
    this.spinner.show();
    this.produtoService.getContarProdutos().subscribe(({
      next:(resultado)=>{
        this.produtosQuantidade = resultado;
        this.spinner.hide();
      },
      error:()=>{}

    }))
  }
  contarFornecedor(){
    this.fornecedorService.getContarFornecedor().subscribe(({
      next: (resultado)=>{
        this.fornecedoresQuantidade = resultado;
        this.spinner.hide();
      },
      error: ()=>{}
    }))
  }

}
