import { Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  formulario: any;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      Nome: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      Email: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.email]),
      CPF: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      Senha: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
    })
      }

    SalvarDados(){
      const usuario = this.formulario.value;
      if(usuario != null){
        this.usuarioService.registrarUsuario(usuario).subscribe(({
          next: ((resultado: any) => {

            if(resultado.usuario != null){

              this.formulario = new FormGroup({
                nome: new FormControl(resultado.nome),
                email: new FormControl(resultado.email),
                cpf: new FormControl(resultado.cpf),
                senha: new FormControl(resultado.senha)
              })
              this.snackBar.open(resultado.mensagem, undefined, {duration:2000, panelClass:"sucesso"});
              this.router.navigate(['']);
            }
            this.snackBar.open(resultado.mensagem, undefined, {duration:2000, panelClass:"erro"});
            
            this.router.navigate(['']);

          }),
          error: ((err: any)=> this.snackBar.open(err.error, undefined,{duration:2000, verticalPosition:"top", horizontalPosition:"right", panelClass:"erro"} )

          ) }))
      }


    }

}
