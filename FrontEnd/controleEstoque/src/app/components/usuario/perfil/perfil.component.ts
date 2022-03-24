import { MatSnackBar } from '@angular/material/snack-bar';
import { Perfil } from './../../../models/perfil';
import { PerfilService } from './../../../services/perfil.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from './../../../models/Usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  perfis = [
    { nome: 'Administrador', value: 0 },
    { nome: 'Fornecedor', value: 1 },
    { nome: 'Cliente', value: 2 },
    { nome: 'Funcionario', value: 3 },
    { nome: 'Visitante', value: 4 },
  ];

  userId: number = 0;
  usuarioNome: any = Usuario;
  perfilNome: string ='';
  formulario: any;
  value: number = 0;
  funcaoCarregada: number = 0;

  constructor(
    private usuarioService: UsuarioService,
    private router: ActivatedRoute,
    private perfilService: PerfilService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.userId = +this.router.snapshot.params['id'];
    this.usuarioService.carregarUsuarioPorId(this.userId).subscribe({
      next: (resultado: Usuario) => {
        this.usuarioNome = resultado.nome;


      },
    });

    this.perfilService.carregarPerfilPorId(this.userId).subscribe({
      next: (resultado: Perfil) => {
        this.funcaoCarregada = resultado.funcoes;
         console.log(resultado)

      },
    });

    this.formulario = new FormGroup({
      usuarioId: new FormControl(this.userId),
      funcoes: new FormControl(this.funcaoCarregada, Validators.required),
    });

    
  }

  salvarDados() {
    const perfil = this.formulario.value;
    console.log(perfil);
     this.perfilService.SalvarPerfil(perfil).subscribe(({
     next:resultado => { this.snackBar.open(resultado.mensagem, undefined, {duration:2000})
                         this.route.navigate(["/listarusuarios"])},
     error: err => console.log(err)

     }))
  }
}
