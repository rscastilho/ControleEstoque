import { Produto } from './../../../models/Produto';
import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produtos-destaque',
  templateUrl: './produtos-destaque.component.html',
  styleUrls: ['./produtos-destaque.component.css']
})
export class ProdutosDestaqueComponent implements OnInit {
  imagemDestaque: Produto[]=[];
  imagens: any;
  dividir: any

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.produtoService.getImagemDestaque().subscribe(({
      next: (resultado: Produto[])=>{
        this.imagemDestaque = resultado;
        let img = (resultado.map(x => x.imagemDestaque))
        this.imagens = img.sort(()=> Math.random() - 0.5).toString();
        this.dividir = this.imagens.split(',');
      },
      error:() => {}
    }))


  }



}
