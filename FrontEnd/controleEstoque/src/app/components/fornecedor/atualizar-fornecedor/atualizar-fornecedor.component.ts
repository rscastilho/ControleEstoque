import { Fornecedor } from './../../../models/Fornecedor';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { FornecedorService } from './../../../services/fornecedor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-atualizar-fornecedor',
  templateUrl: './atualizar-fornecedor.component.html',
  styleUrls: ['./atualizar-fornecedor.component.css']
})
export class AtualizarFornecedorComponent implements OnInit {

  formulario: any;
  fornecedorId: number = 0;


  constructor(private fornecedorService: FornecedorService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fornecedorId = this.route.snapshot.params['id'];
    this.formulario = new FormGroup({
      razaoSocial: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(12)]),
    });

    this.fornecedorService.getFornecedorById(this.fornecedorId).subscribe(({
      next:(resultado: Fornecedor)=>{
        this.formulario = new FormGroup({
          id: new FormControl(resultado.id, [Validators.required]),
          razaoSocial: new FormControl(resultado.razaoSocial, [Validators.required]),
          cnpj: new FormControl(resultado.cnpj, [Validators.required, Validators.maxLength(15), Validators.minLength(12)]),

        });
        this.spinner.hide();
      },
      error:(err: any)=>{this.snackBar.open(err.mensagem, 'X', {duration: 2000, panelClass:['erro']});
                          this.spinner.hide();
                        }
    }))
  }

  salvarDados(){
    this.spinner.show();
    const fornecedor = this.formulario.value;
    this.fornecedorService.putFornecedor(fornecedor).subscribe(({
      next: (resultado: any)=>{this.snackBar.open(resultado.mensagem,'X', {duration: 2000, panelClass:['sucesso']});
                                this.router.navigate(['/layout/listarfornecedores']);
                                this.spinner.hide()
                              },
      error: (err: any)=>{this.spinner.hide();
                          this.snackBar.open(err.message, 'X', {duration: 2000, panelClass:['erro']})}
    }))

  }

}
