import { Produto } from './../../../models/Produto';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from './../../../services/produto.service';
import { Fornecedor } from './../../../models/Fornecedor';
import { Categoria } from './../../../models/categoria';
import { FornecedorService } from './../../../services/fornecedor.service';
import { CategoriaService } from './../../../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit {
  formulario: any;
  valor: number=0;
  quantidade: number=0;
  valorTotal: any;
  categorias: Categoria[]=[];
  fornecedores: Fornecedor[]=[];
  imagemURL: string = '/assets/upload.jpg';
  file : any;
  nomeImg: string='';




  constructor(private categoriaService: CategoriaService,
              private fornecedorService: FornecedorService,
              private produtoService: ProdutoService,
              private snackBar: MatSnackBar,
              private router: Router,
              private spinner: NgxSpinnerService) { }



  ngOnInit(): void {
    this.spinner.show();
    this.formulario = new FormGroup({
      descricao:new FormControl(null, [Validators.required]),
      imagemUrl:new FormControl(null, [Validators.required]),
      quantidadeEstoque:new FormControl(null, [Validators.required]),
      quantidadeMinima:new FormControl(null, [Validators.required]),
      valor:new FormControl(null, [Validators.required]),
      categoriaId:new FormControl(null, [Validators.required]),
      fornecedorId:new FormControl(null),
    })
    this.categoriaService.getAllCAtegorias().subscribe(({
      next:(resultado)=>{this.categorias = resultado
                          this.spinner.hide()},
      error:()=>{}
    }))

    this.fornecedorService.getAllFornecedores().subscribe(({
      next:(resultado)=>{this.fornecedores = resultado;
                        this.spinner.hide()},
      error:()=>{}
    }))

  }

  // salvar(){
  //   //this.spinner.show();
  //   console.log(this.file);
  //    this.produtoService.postImagem(this.file).subscribe(resultado => {
  //      console.log(resultado)
  //      this.salvarDados();

  //    })
  // }

  salvarDados(){
    this.spinner.show();
    const produto = this.formulario.value;
    this.produtoService.postProduto(produto).subscribe(({
      next: (resultado) => {
          this.snackBar.open(resultado.mensagem, undefined, {duration:2000, panelClass:['sucesso']});
            this.router.navigate(["/listarprodutos"]);
            this.spinner.hide()
      },
      error: (err: any) => {
        if (err.status == 401){
          console.error ("sem autorização", err)
        }
      },
      complete: () => {
            this.produtoService.salvaImagem(this.file).subscribe(result => {
            console.log(result);
            this.spinner.hide();
      })

      },
    }))

  }

  calcularValor(){
    this.valorTotal = `Valor total do estoque R$ ${+this.quantidade * this.valor}`
  }

  carregarImagem(ev: any){
    const reader = new FileReader();
    reader.onload = (img: any) => this.imagemURL = img.target.result;
    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0])
    this.nomeImg = ev.target.value.replace(/C:\\fakepath\\/i,'');

  }

}
