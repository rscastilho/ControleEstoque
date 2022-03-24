import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcluirUsuarioComponent } from './../excluir-usuario/excluir-usuario.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Usuario } from './../../../models/Usuario';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
              private spinner: NgxSpinnerService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar
              ) { }

  usuarios = new MatTableDataSource<any>();
  displayedColumns: string[]=[];


  @ViewChild(MatSort, {static:true}) sort: any = MatSort;


  ngOnInit(): void {
    this.spinner.show();
    this.usuarioService.carregarTodosUsuarios().subscribe(({
      next:(resultado: Usuario[]) => {
        this.usuarios.data = resultado;
        this.usuarios.sort = this.sort;
        this.spinner.hide();
        console.log(resultado)

      }
      ,
      error:(err: any) => {
              this.snackBar.open(`Erro ao carregar usuarios. Erro: ${err.message}`, " X ", {duration:3000, panelClass:['erro']});
              this.spinner.hide();

      }
    })).unsubscribe;

    this.displayedColumns = this.carregarColunas();

  }

  carregarColunas(){
    return ['nome', 'email', 'cpf', 'blocked', 'botoes'];
  }

  openDialog(usuarioId: number, nome: string){

    const mensagem = this.dialog.open(ExcluirUsuarioComponent, {
      data:{
        usuarioId: usuarioId,
        nome: nome
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado == true){
        this.usuarioService.carregarTodosUsuarios().subscribe(dados => {
          this.usuarios.data = dados;
        });
        this.displayedColumns = this.carregarColunas();
      }
    })
  }

  pesquisarNome(nome:string){
    if(nome.trim().length > 3){
      this.usuarioService.carregarUsuariosPorNome(nome).subscribe(({
        next: (resultado: Usuario[])=>{this.usuarios.data = resultado}
      }))
    } else if (nome === ''){
      this.usuarioService.carregarTodosUsuarios().subscribe(({
        next: (resultado: Usuario[]) => { this.usuarios.data = resultado}
      }))
    }
  }



}
