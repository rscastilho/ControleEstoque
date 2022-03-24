import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcluirCategoriasComponent } from './../excluir-categorias/excluir-categorias.component';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from './../../../models/categoria';
import { CategoriaService } from './../../../services/categoria.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.css']
})
export class ListarCategoriasComponent implements OnInit {

  categorias = new MatTableDataSource<any>();
  displayColumns: string []=[];

  @ViewChild(MatSort, {static:true}) sort: any = MatSort;


  constructor(private categoriaService: CategoriaService,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.spinner.show();
    this.categoriaService.getAllCAtegorias().subscribe(({
      next: (resultado: Categoria[])=>{
        this.categorias.data = resultado;
        this.categorias.sort = this.sort;
        this.spinner.hide();

      },
      error: (err: any)=> {
                  this.snackBar.open(err.menssage, 'X', {duration:2000, panelClass:['erro']})
                  this.spinner.hide();
      }

    }))

    this.displayColumns = this.exibirColunas();
  }

  exibirColunas(){
    return ['descricao', 'acao'];
  }

  openDialog(categoriaId: number, nomeCategoria: string){
    this.dialog.open(ExcluirCategoriasComponent, {
      data:{
        categoriaId: categoriaId,
        nomeCategoria: nomeCategoria
      }
    }).afterClosed().subscribe(({
      next:(resultado)=>{
        if (resultado == true){
          this.categoriaService.getAllCAtegorias().subscribe(({
            next:(dados)=>{this.categorias.data = dados},
            error:(err: any) => {this.snackBar.open(`Erro ao carregar informações. Erro: ${err}`, undefined, {duration: 2000})}
          }))
        }
      },
      error:()=>{this.snackBar.open("Erro ao carregar informações", 'X', {duration: 2000})}
    }))

  }

}
