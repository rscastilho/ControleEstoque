import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort } from '@angular/material/sort';
import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css'],
})
export class ListarProdutosComponent implements OnInit {
  produtos = new MatTableDataSource<any>();
  displayColumns: string[] = [];
  @ViewChild(MatSort, { static: true }) sort: any = MatSort;

  constructor(private produtoService: ProdutoService,
    private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.produtoService.getAllProdutos().subscribe({
      next: (resultado) => {
        this.produtos.data = resultado;
        this.produtos.sort = this.sort;
        this.spinner.hide();
        
      },

      error: (err: any) => {
        console.log(err);
      },
    });

    this.displayColumns = this.exibirColunas();
  }

  exibirColunas() {
    return [
      'imagemUrl',
      'descricao',
      'quantidadeEstoque',
      'valor',
      'valorTotal',
      'categoria',
      'destacarImagem',
      'acao',
    ];
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
      this.produtoService.getAllProdutos().subscribe((resultado) => {
        this.produtos.data = resultado;
      });
    }
  }
}
