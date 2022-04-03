import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort } from '@angular/material/sort';
import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css'],
})
export class ListarProdutosComponent implements OnInit {
  produtos = new MatTableDataSource<any>();
  displayColumns: string[] = [];
  @ViewChild(MatSort, { static: true }) sort: any = MatSort;
  pageSizeOptions: number=5;
  numeroRegistros: number=0;
  numeroPaginas: number=0;
  botoesPaginas: number[]=[];
  paginas: any;

  constructor(private produtoService: ProdutoService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.produtoService.getContarProdutos().subscribe(({
      next: (resultado)=>{this.numeroRegistros = resultado
        this.numeroPaginas =Math.ceil(this.numeroRegistros / this.pageSizeOptions)
        this.botaoPaginas();
      },
      error:()=>{}
    }))
    this.produtoService.getAllProdutos(0, 5).subscribe({
      next: (resultado) => {
        console.log(resultado)
        this.produtos.data = resultado;

        this.produtos.sort = this.sort;
        this.spinner.hide();
      },

      error: (err: any) => {
        console.log(err.messsage);
      },
    });

    this.displayColumns = this.exibirColunas();

  }

  exibirColunas() {
    return ['imagemUrl','descricao','quantidadeEstoque','valor','valorTotal','categoria','destacarImagem','acao' ];
  }

  pesquisarProduto(nomeProduto: string) {
    if (nomeProduto.trim().length > 3) {
      setTimeout(() => {
        this.produtoService.getProdutoByName(nomeProduto).subscribe({
          next: (resultado) => {
            this.produtos.data = resultado;
          },
        });
      }, 500);
    } else if (nomeProduto === '') {
      this.produtoService.getAllProdutos(0,5).subscribe((resultado) => {
        this.produtos.data = resultado;
      });
    }
  }

  paginar(numero: number){
    this.spinner.show();
    this.produtoService.getAllProdutos(0, numero).subscribe({
      next: (resultado) => {
        console.log(resultado)
        this.produtos.data = resultado;
        this.numeroPaginas =Math.ceil(this.numeroRegistros / resultado.length)
        this.botaoPaginas();
        this.produtos.sort = this.sort;
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err.messsage);
      },
    });
    this.displayColumns = this.exibirColunas();
  }

  mudarPagina(mudaPagina: number){
    this.spinner.show();
    this.produtoService.getAllProdutos(mudaPagina, this.pageSizeOptions).subscribe({
      next: (resultado) => {
        this.produtos.data = resultado;
        this.numeroPaginas =Math.ceil(this.numeroRegistros / resultado.length)
        this.botaoPaginas();
        this.produtos.sort = this.sort;
        this.spinner.hide();
      },
      error: (err: any) => {
        console.log(err.messsage);
      },
    });
    this.displayColumns = this.exibirColunas();
  }
  botaoPaginas(){
    this.botoesPaginas=[]
      for(let i = 0; i < this.numeroPaginas; i++){
        this.botoesPaginas.push(i+1);

       }
  }
}
