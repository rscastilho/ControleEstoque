import { Produto } from './../../../models/Produto';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from './../../../services/produto.service';
import { FornecedorService } from './../../../services/fornecedor.service';
import { CategoriaService } from './../../../services/categoria.service';
import { Fornecedor } from './../../../models/Fornecedor';
import { Categoria } from './../../../models/categoria';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-atualizar-produtos',
  templateUrl: './atualizar-produtos.component.html',
  styleUrls: ['./atualizar-produtos.component.css']
})
export class AtualizarProdutosComponent implements OnInit {
  formulario: any;
  valor: number=0;
  quantidade: number=0;
  valorTotal: any;
  categorias: Categoria[]=[];
  fornecedores: Fornecedor[]=[];
  produtoId: number=0;
  nomeImg: string='';
  file : any;
  imagemURL: string = '';
  imagemDestaque: string = 'assets/upload.jpg';
  nome: string='';
  destaque: any;



  constructor(private categoriaService: CategoriaService,
    private fornecedorService: FornecedorService,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute) { }

    ngOnInit(): void {
      this.spinner.show();
      this.produtoId = this.route.snapshot.params['id'];

      this.formulario = new FormGroup({
        descricao:new FormControl(null),
        imagemUrl:new FormControl(null),
        destacarImagem: new FormControl(null),
        imagemDestaque: new FormControl(null),
        quantidadeEstoque:new FormControl(null),
        quantidadeMinima:new FormControl(null),
        valor:new FormControl(null),
        categoriaId:new FormControl(null),
        fornecedorId:new FormControl(null),
      })
      this.categoriaService.getAllCAtegorias().subscribe(({
        next:(resultado)=>{this.categorias = resultado
                            this.spinner.hide()
                          },
        error:()=>{}
      }))

      this.fornecedorService.getAllFornecedores().subscribe(({
        next:(resultado)=>{this.fornecedores = resultado;
                          this.spinner.hide()},
        error:()=>{}
      }))

      this.produtoService.getAllProdutoById(this.produtoId).subscribe(({
        next:(resultado: Produto)=>{

          this.valorTotal = resultado.valorTotal
          this.quantidade = resultado.quantidadeEstoque;
          this.valor = resultado.valor;
          this.imagemURL =`https://localhost:5001/recursos/imagens/${resultado.imagemUrl}`;
          this.imagemDestaque = `https://localhost:5001/recursos/imagens/${resultado.imagemDestaque}`;
          this.nome = resultado.descricao;
          this.destaque = resultado.imagemDestaque;

          this.formulario = new FormGroup({
            id: new FormControl(resultado.id),
            descricao:new FormControl(resultado.descricao, [Validators.required]),
            imagemUrl:new FormControl(resultado.imagemUrl,[Validators.required]),
            destacarImagem: new FormControl(resultado.destacarImagem),
            imagemDestaque: new FormControl(resultado.imagemDestaque),
            quantidadeEstoque:new FormControl(resultado.quantidadeEstoque,[Validators.required]),
            quantidadeMinima:new FormControl(resultado.quantidadeMinima,[Validators.required]),
            valor:new FormControl(resultado.valor),
            valorTotal: new FormControl(resultado.valorTotal),
            categoriaId:new FormControl(resultado.categoriaId,[Validators.required]),
            fornecedorId:new FormControl(resultado.fornecedorId,[Validators.required]),
          })


        },
        error:()=>{}
      }))

    }

  salvarDados(){
    this.spinner.show();
    const produto = this.formulario.value;
    this.produtoService.putProduto(produto).subscribe(({
      next:(resultado: any)=>{
        this.snackBar.open(resultado.mensagem, undefined, {duration:2000, panelClass:['sucesso']});
        this.router.navigate(['/listarprodutos'])
        this.spinner.hide();


      },
      error:() =>{},
      complete: ()=>{
        this.produtoService.getAllProdutoById(this.produtoId).subscribe(resultado =>{
            this.produtoService.salvaImagem(this.file).subscribe(resultado => {
              console.log("salvei imagem")
            })
        })
      }


    }))

  }
  calcularValor(){
    this.valorTotal = this.quantidade * this.valor
  }
  carregarImagem(ev: any){
    const reader = new FileReader();
    reader.onload = (img: any) => this.imagemURL = img.target.result;
    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0])
    this.nomeImg = ev.target.value.replace(/C:\\fakepath\\/i,'');

  }

}
