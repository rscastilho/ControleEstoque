import { Produto } from './../../../models/Produto';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoService } from './../../../services/produto.service';

import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {
  produtoDetalhe: Produto = new Produto;


  constructor(private produtoService: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public dados: any
    ) { }

  ngOnInit(): void {

    this.produtoService.getAllProdutoById(this.dados.produtoId).subscribe(({
      next: (resultado:Produto)=>{ this.produtoDetalhe = resultado;
        
      }
    }))


  }



}
