import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from './../../../models/login';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private snakCkBar: MatSnackBar,
    private spinner: NgxSpinnerService
  ) {}

  formulario: any;
  usuarios: any;
  mensagemErro: any;

  ngOnInit(): void {
    localStorage.clear();

    this.formulario = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100),
        Validators.email,
      ]),
      senha: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
    });
  }

  get propriedades() {
    return this.formulario.controls;
  }

  login() {
    this.spinner.show();
    const login = this.formulario.value;
    if(login != null){
      this.usuarioService.login(login).subscribe({
        next: (resultado: any) => {
           if (resultado.usuario != null) {
            const usuarioId = resultado.usuario.id;
            const emailLogado = resultado.usuario.email;
            const token = resultado.tokenUsuario.result;
            const usuario = resultado;
            this.mensagemErro = resultado
            this.spinner.hide();
            localStorage.setItem('tokenUsuario', token);
            localStorage.setItem('usuarioId', usuarioId);
            localStorage.setItem('emailLogado', emailLogado);
            this.router.navigate(['/home']);
            this.snakCkBar.open(resultado.mensagem, undefined, {
              duration: 2000, panelClass:['sucesso']

            });
                    }
          this.snakCkBar.open(resultado.mensagem, undefined, { duration: 2000, panelClass:['erro']});
          this.spinner.hide();
        },
         error: (err: any) => {
              this.spinner.show();
               if(err.status == 401){
                 this.snakCkBar.open('Usuario ou senha invalidos')
                 this.spinner.hide();
               }
              this.snakCkBar.open(`Erro ao logar no sistema. Erro: ${err.message}`, "X", {duration:2000, panelClass:['erro']});
              this.spinner.hide();
         }
      });
    }
  }
}
