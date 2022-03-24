import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-excluir-usuario',
  templateUrl: './excluir-usuario.component.html',
  styleUrls: ['./excluir-usuario.component.css']
})
export class ExcluirUsuarioComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public dados: any,
              private usuarService: UsuarioService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  excluirUsuario(usuarioId: number){
    this.usuarService.excluirUsuario(usuarioId).subscribe(resultado => {
      this.dados = resultado;
      this.snackBar.open(resultado.mensagem, undefined, {duration: 2000})

    })

  }

}
