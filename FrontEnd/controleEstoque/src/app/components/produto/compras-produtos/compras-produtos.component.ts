import { CarrinhoService } from './../../../services/carrinho.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Carrinho } from './../../../models/carrinho';
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
  produtosCarrinho: Carrinho[] = [];
  produtoId: number = 0;
  carrinho: any;
  carrinhoExistente: any;
  quantidade: number =1;

  constructor(
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private carrinhoService: CarrinhoService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carrinhoExistente = localStorage.getItem(('comprar'));
    this.carrinho = JSON.parse(this.carrinhoExistente);
    this.spinner.show();
    this.produtoService.getAllProdutos(0,15).subscribe({
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

    let carrinhoCompra = new Carrinho();
    carrinhoCompra.id = produto.id;
    carrinhoCompra.descricao = produto.descricao;
    carrinhoCompra.quantidade = this.quantidade;
    carrinhoCompra.valorUnitario = produto.valor;
    carrinhoCompra.valorTotal = produto.valorTotal;
    carrinhoCompra.imagemUrl = produto.imagemUrl

    this.carrinhoService.adicionarItensCarrinho(carrinhoCompra);


    // this.produtosCarrinho.push(carrinhoCompra);
    // let numero = this.produtosCarrinho.length;
    // localStorage.setItem('comprar', JSON.stringify(this.produtosCarrinho));
    // localStorage.setItem('itens', numero.toString());
  }
    //this.verificaItemCarrinho(carrinhoCompra)


    // console.log('novo carrinho', carrinhoCompra)
    // console.log('carrinhoPush', this.produtosCarrinho);
    // [...this.produtosCarrinho].forEach(prod =>{
    //   console.log('itemdocarrinho', prod.id);
    // // });
    // console.log(
    //   'itens do carrinho',
    //   this.produtosCarrinho,
    //   'quantidade itens',
    //   numero
    // );


  verificaItemCarrinho(carrinho: Carrinho){
    this.produtosCarrinho.forEach(item => {
      if(item.id === carrinho.id){
        this.snackBar.open("produto ja adicionado no carrinho", 'X', {panelClass:['erro']})
      }
      return true
    })
    console.log('item somado', this.quantidade);

  }


  abrirModal(produtoId: number) {
    this.dialog.open(ProdutoDetalheComponent, {
      data: {
        produtoId,
      },
    });
  }
}
