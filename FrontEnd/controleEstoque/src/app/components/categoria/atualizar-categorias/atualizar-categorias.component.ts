import { Categoria } from './../../../models/categoria';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoriaService } from './../../../services/categoria.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atualizar-categorias',
  templateUrl: './atualizar-categorias.component.html',
  styleUrls: ['./atualizar-categorias.component.css']
})
export class AtualizarCategoriasComponent implements OnInit {

  formulario: any
  categoriaId: number = 0;

  constructor(private route: ActivatedRoute,
              private categoriaService: CategoriaService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.categoriaId = this.route.snapshot.params['id'];
    this.categoriaService.getCategoriaPorId(this.categoriaId).subscribe(({
      next:
      (resultado: any)=>{

        this.formulario = new FormGroup({
          id: new FormControl(resultado.usuario.id),
          descricao: new FormControl(resultado.usuario.descricao)

        })
      },
      error:() => {this.snackBar.open("Erro ao carregar informações", 'X', {duration: 2000})}
    }))

    this.formulario = new FormGroup({
      id: new FormControl(),
      descricao: new FormControl()
    })
  }

  salvarDados(){
    const categoria = this.formulario.value;
    this.categoriaService.putCategoria(categoria).subscribe(({
      next:(resultado: any)=>{
        this.snackBar.open(resultado.mensagem, undefined, {duration:2000})
        this.router.navigate(["/layout/listarcategorias"])
      },
      error:(err:any) => {this.snackBar.open(`Erro ao cadastrar. erro: ${err}`)}
    }))

  }

}
