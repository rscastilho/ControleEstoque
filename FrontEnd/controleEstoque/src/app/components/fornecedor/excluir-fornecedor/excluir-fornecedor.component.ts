import { MatSnackBar } from '@angular/material/snack-bar';
import { FornecedorService } from './../../../services/fornecedor.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-fornecedor',
  templateUrl: './excluir-fornecedor.component.html',
  styleUrls: ['./excluir-fornecedor.component.css']
})
export class ExcluirFornecedorComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dados: any,
  private forncedorService: FornecedorService,
  private snackBar:MatSnackBar) { }

  ngOnInit(): void {

  }

  excluirUsuario(fornecedorId: number){
    this.forncedorService.deleteFornecedor(fornecedorId).subscribe(({
      next: (resultado: any)=>{this.snackBar.open(resultado.mensagem, 'X', {duration:2000, panelClass:['sucesso']})},
      error: (err)=>{this.snackBar.open(err.message, 'X', {duration: 2000, panelClass:['erro']})}
    }))

  }

}
