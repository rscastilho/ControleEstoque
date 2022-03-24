import { ExcluirFornecedorComponent } from './../excluir-fornecedor/excluir-fornecedor.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Fornecedor } from './../../../models/Fornecedor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { FornecedorService } from './../../../services/fornecedor.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-listar-fornecedores',
  templateUrl: './listar-fornecedores.component.html',
  styleUrls: ['./listar-fornecedores.component.css']
})
export class ListarFornecedoresComponent implements OnInit {

  fornecedores = new MatTableDataSource<any>();
  displayColumns: string[]=[];

  @ViewChild(MatSort, {static:true}) sort: any = MatSort;

  constructor(private fornecedorService: FornecedorService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private diaglog: MatDialog) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fornecedorService.getAllFornecedores().subscribe(({
      next:(resultado: Fornecedor[])=>{
            this.fornecedores.data = resultado;
            this.fornecedores.sort = this.sort;
            this.spinner.hide();

          },
      error:(err: any)=>{this.snackBar.open(err.mensagem, undefined, {duration: 2000})}
    }))
    this.displayColumns = this.exibirColunas();
  }

  exibirColunas(){
    return ['razaoSocial', 'cnpj', 'acao']
  }


  openDialog(id: number, razaoSocial: string){

    this.diaglog.open(ExcluirFornecedorComponent, {
      data:{
        id: id,
        razaoSocial: razaoSocial
      }
    }).afterClosed().subscribe(({
      next: (resultado: any)=>{
        if(resultado == true){
          this.fornecedorService.getAllFornecedores().subscribe(({
            next: (dados)=>{this.fornecedores.data = dados},
            error:(err)=>{this.snackBar.open(err.message, 'X', {duration:200, panelClass: ['erro']})}
          }))
        }
      }
    }))

  }

}
