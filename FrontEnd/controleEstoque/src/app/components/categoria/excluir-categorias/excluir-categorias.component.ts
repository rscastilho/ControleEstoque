import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaService } from './../../../services/categoria.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-excluir-categorias',
  templateUrl: './excluir-categorias.component.html',
  styleUrls: ['./excluir-categorias.component.css']
})
export class ExcluirCategoriasComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dados:any,
              private categoriaService: CategoriaService,
              private snackBar: MatSnackBar ) { }

  ngOnInit(): void {
  }

  excluirUsuario(usuarioId: number){
    this.categoriaService.deleteCategoria(usuarioId).subscribe(({
      next:(resultado: any)=>{this.snackBar.open(resultado.mensagem, undefined, {duration:2000})},
      error: ()=>{this.snackBar.open("Erro ao tentar excluir categoria", undefined, {duration:2000})}
    }))

  }

}
