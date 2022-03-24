import { Produto } from './../../../models/Produto';
import { Categoria } from './../../../models/categoria';
import { ProdutoService } from './../../../services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos-categoria',
  templateUrl: './produtos-categoria.component.html',
  styleUrls: ['./produtos-categoria.component.css']
})
export class ProdutosCategoriaComponent implements OnInit {

  nomeCategoria: string ='';
  categoriaId: number=0;
  produtos: Produto[]=[];

  constructor(private route: ActivatedRoute,
              private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params['id'];
    this.produtoService.getProdutosByCategoriaId(this.categoriaId).subscribe(({
      next: (resultado: Produto[])=>{this.produtos = resultado
                                    console.log(resultado)},
      error: ()=>{},
      complete:()=>{}
    }))

  }

}
