import { Fornecedor } from './../../../models/Fornecedor';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { FornecedorService } from './../../../services/fornecedor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cadastrar-fornecedor',
  templateUrl: './cadastrar-fornecedor.component.html',
  styleUrls: ['./cadastrar-fornecedor.component.css']
})
export class CadastrarFornecedorComponent implements OnInit {

  formulario: any;

  constructor(private fornecedorService: FornecedorService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit(): void {
    this.formulario = new FormGroup({
      razaoSocial: new FormControl(null, [Validators.required]),
      cnpj: new FormControl(null, [Validators.required, Validators.maxLength(15), Validators.minLength(12)]),
    })
  }

  salvarDados(){
    this.spinner.show();
    const fornecedor = this.formulario.value;
    this.fornecedorService.postFornecedor(fornecedor).subscribe(({
      next:(resutlado: any)=>{this.snackBar.open(resutlado.mensagem,'X', {duration: 2000, panelClass:['sucesso']});
                              this.spinner.hide();
                              this.router.navigate(['/listarfornecedores'])},
      error: (err:any)=>{this.snackBar.open(err.mensagem, 'X', {duration: 2000, panelClass:['erro']});
                          this.spinner.hide();
                        }
    }));
  }

}
