import { Router } from '@angular/router';
import { Categoria } from './../../../models/categoria';
import { CategoriaService } from './../../../services/categoria.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-categorias',
  templateUrl: './cadastrar-categorias.component.html',
  styleUrls: ['./cadastrar-categorias.component.css']
})
export class CadastrarCategoriasComponent implements OnInit {

  formulario: any;
  categoriaDinamica : string ='';

  constructor(private categoriaService: CategoriaService,
              private spinner : NgxSpinnerService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.formulario = new FormGroup({
      descricao : new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(60)])
    })
  }

  salvarDados(){
    this.spinner.show();
    const categoria = this.formulario.value;
    this.categoriaService.postCategoria(categoria).subscribe(({
      next:(resultado: any)=>{
        this.formulario = new FormGroup({
          descricao: new FormControl(resultado.Descricao, [Validators.required])
        })
        this.spinner.hide();
        this.snackBar.open(resultado.mensagem, 'X', {duration: 2000})
        this.router.navigate(["/listarcategorias"]);
      },
      error:(err: any)=>{ this.snackBar.open(`Erro ao cadastrar categoria. Erro: ${err.message}`, 'X', {duration: 2000})
                          this.spinner.hide()}
    }))
  }

}
