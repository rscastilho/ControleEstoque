import { Produto } from './../../../models/Produto';
import { NgxSpinnerService } from 'ngx-spinner';
import { Fornecedor } from './../../../models/Fornecedor';
import { Categoria } from './../../../models/categoria';
import { FornecedorService } from './../../../services/fornecedor.service';
import { CategoriaService } from './../../../services/categoria.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ProdutoService } from './../../../services/produto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produto-imagem-destaque',
  templateUrl: './produto-imagem-destaque.component.html',
  styleUrls: ['./produto-imagem-destaque.component.css']
})
export class ProdutoImagemDestaqueComponent implements OnInit {
  produtoId: number = 0;
  formulario: any;
  categorias: Categoria[]=[];
  fornecedores: Fornecedor[]=[];
  file : any;
  imagemURL: string = '';
  imagemURL1: string = 'assets/upload.jpg';
  nomeImg: string='';
  imagem: string='';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private produtoService: ProdutoService,
              private categoriaService: CategoriaService,
              private fornecedorService: FornecedorService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar)
               { }

  ngOnInit(): void {
    this.produtoId = this.route.snapshot.params['id'];
    this.produtoService.getAllProdutoById(this.produtoId).subscribe(({
      next: (resultado)=>{console.log(resultado)},
      error: ()=>{}
    }))

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
        this.imagemURL =`https://localhost:5001/recursos/imagens/${resultado.imagemDestaque}`

        this.formulario = new FormGroup({
          id: new FormControl(resultado.id),
          descricao:new FormControl(resultado.descricao),
          imagemUrl:new FormControl(resultado.imagemUrl),
          destacarImagem: new FormControl(resultado.destacarImagem),
          imagemDestaque: new FormControl(resultado.imagemDestaque),
          quantidadeEstoque:new FormControl(resultado.quantidadeEstoque),
          quantidadeMinima:new FormControl(resultado.quantidadeMinima),
          valor:new FormControl(resultado.valor),
          categoriaId:new FormControl(resultado.categoriaId),
          fornecedorId:new FormControl(resultado.fornecedorId),
        })

        console.log(this.formulario)


      },
      error:()=>{}
    }))

  }


  salvarDados(){
     this.spinner.show();
    const produto = this.formulario.value;
    console.log(produto)
    this.produtoService.putImagemDestaque(produto).subscribe(({
      next:(resultado: any)=>{
        this.snackBar.open(resultado.mensagem, undefined, {duration:2000, panelClass:['sucesso']});
        this.router.navigate(['/home'])
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


  carregarImagem(ev: any){
    const reader = new FileReader();
    reader.onload = (img: any) => this.imagemURL = img.target.result;
    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0])
    this.imagem = ev.target.value.replace(/C:\\fakepath\\/i,'');

  }

}
