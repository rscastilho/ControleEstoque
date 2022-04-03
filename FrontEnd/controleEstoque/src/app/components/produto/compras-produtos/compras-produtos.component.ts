import { UsuarioService } from './../../../services/usuario.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProdutoDetalheComponent } from './../produto-detalhe/produto-detalhe.component';
import { MatDialog } from '@angular/material/dialog';
import { Categoria } from './../../../models/categoria';
import { CategoriaService } from './../../../services/categoria.service';
import { FormControl } from '@angular/forms';
import { Produto } from './../../../models/Produto';
import { ProdutoService } from './../../../services/produto.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compras-produtos',
  templateUrl: `./compras-produtos.component.html`,
  styleUrls: ['./compras-produtos.component.css'],
})
export class ComprasProdutosComponent implements OnInit {
  categoriaForm = new FormControl();
  produtos: Produto[] = [];
  categorias: Categoria[] = [];
  produtosCarrinho: Produto[] = [];
  produtoId: number = 0;
  carrinho: any;
  carrinhoExistente: any;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.carrinhoExistente = localStorage.getItem(('comprar'));
    this.carrinho = JSON.parse(this.carrinhoExistente);
    this.spinner.show();
    this.produtoService.getAllProdutos().subscribe({
      next: (resultado: Produto[]) => {
        this.produtos = resultado;
        this.spinner.hide();
      },
      error: () => {},
      complete: () => {},
    });
    this.carregarCategorias();
  }


  carregarCategorias() {
    this.spinner.show();
    this.categoriaService.getAllCAtegorias().subscribe({
      next: (resultado: Categoria[]) => {
        this.categorias = resultado;
        this.spinner.hide();
      },
    });
  }

  pesquisar(e: any) {
    console.log(e);
  }

  adicionarCarrinho(produto: Produto) {
    this.produtosCarrinho.push(produto);
    let numero = this.produtosCarrinho.length;
    localStorage.setItem('comprar', JSON.stringify(this.produtosCarrinho));
    localStorage.setItem('itens', numero.toString());
    console.log(
      'itens do carrinho',
      this.produtosCarrinho,
      'quantidade itens',
      numero
    );
  }

  abrirModal(produtoId: number) {
    this.dialog.open(ProdutoDetalheComponent, {
      data: {
        produtoId,
      },
    });
  }
}
