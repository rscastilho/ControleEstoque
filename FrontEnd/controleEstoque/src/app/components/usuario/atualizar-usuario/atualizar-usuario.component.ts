import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from './../../../models/Usuario';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-atualizar-usuario',
  templateUrl: './atualizar-usuario.component.html',
  styleUrls: ['./atualizar-usuario.component.css']
})
export class AtualizarUsuarioComponent implements OnInit {


  user: number=0;
  usuario : string = '';
  formulario: any;

  constructor(private usuarioService: UsuarioService,
              private router: ActivatedRoute,
              private spinner: NgxSpinnerService,
              private route: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.spinner.show();

    this.user = this.router.snapshot.params['id']
    this.usuarioService.carregarUsuarioPorId(this.user).subscribe(

      (resultado: Usuario) => {
        this.spinner.hide();
        this.usuario =  resultado.nome;
        this.formulario = new FormGroup({
          id: new FormControl(resultado.id, Validators.required),
          nome: new FormControl(resultado.nome, Validators.required),
          email: new FormControl(resultado.email),
          cpf: new FormControl(resultado.cpf),
          ultimoAcesso: new FormControl(resultado.ultimoAcesso),
          blocked: new FormControl(resultado.blocked)
        })
      })


}

  salvarDados(){
     const usuarioAtualizar = this.formulario.value;
    this.usuarioService.atualizarUsuario(usuarioAtualizar).subscribe(({
    next:(resultado: any)=>{
        console.log(resultado.mensagem)
        this.snackBar.open(resultado.mensagem, undefined, {duration:2000})

        this.route.navigate(['/listarusuarios'])
      },
       error:(err: any)=>{console.error(err)}
     }))
  }

}
