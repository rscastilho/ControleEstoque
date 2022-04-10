import { CarrinhoService } from './services/carrinho.service';
import { ProdutoService } from './services/produto.service';
import { FornecedorService } from './services/fornecedor.service';
import { CategoriaService } from './services/categoria.service';
import { PerfilService } from './services/perfil.service';
import { AutorizaService } from './services/auth.service';
import { UsuarioService } from './services/usuario.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/usuario/login/login.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//material
import {MatToolbarModule} from '@angular/material/toolbar';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { TituloComponent } from './components/shared/titulo/titulo.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxMaskModule, IConfig } from "ngx-mask";
import { AtualizarUsuarioComponent } from './components/usuario/atualizar-usuario/atualizar-usuario.component';
import {MatListModule} from '@angular/material/list';
import { JwtModule } from "@auth0/angular-jwt";
import {MatSidenavModule} from '@angular/material/sidenav';
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatDialogModule} from '@angular/material/dialog';
import { ExcluirUsuarioComponent } from './components/usuario/excluir-usuario/excluir-usuario.component';
import { ListarCategoriasComponent } from './components/categoria/listar-categorias/listar-categorias.component';
import { CadastrarCategoriasComponent } from './components/categoria/cadastrar-categorias/cadastrar-categorias.component';
import { AtualizarCategoriasComponent } from './components/categoria/atualizar-categorias/atualizar-categorias.component';
import { ExcluirCategoriasComponent } from './components/categoria/excluir-categorias/excluir-categorias.component';
import { ListarFornecedoresComponent } from './components/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { CadastrarFornecedorComponent } from './components/fornecedor/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { AtualizarFornecedorComponent } from './components/fornecedor/atualizar-fornecedor/atualizar-fornecedor.component';
import { ExcluirFornecedorComponent } from './components/fornecedor/excluir-fornecedor/excluir-fornecedor.component';
import { HomeComponent } from './components/home/home.component';
import { ListarProdutosComponent } from './components/produto/listar-produtos/listar-produtos.component';
import { CadastrarProdutosComponent } from './components/produto/cadastrar-produtos/cadastrar-produtos.component';
import { AtualizarProdutosComponent } from './components/produto/atualizar-produtos/atualizar-produtos.component';
import { ExcluirProdutosComponent } from './components/produto/excluir-produtos/excluir-produtos.component';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NotfoundComponent } from './components/notfound/notfound.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProdutosCategoriaComponent } from './components/produto/produtos-categoria/produtos-categoria.component';
import { ComprasProdutosComponent } from './components/produto/compras-produtos/compras-produtos.component';
import { ProdutosDestaqueComponent } from './components/produto/produtos-destaque/produtos-destaque.component';
import { ProdutoDetalheComponent } from './components/produto/produto-detalhe/produto-detalhe.component';
import {MatBadgeModule} from '@angular/material/badge';
import { CarrinhoUsuarioComponent } from './components/usuario/carrinho-usuario/carrinho-usuario.component';
import { ProdutoImagemDestaqueComponent } from './components/produto/produto-imagem-destaque/produto-imagem-destaque.component';
import { DashHomeComponent } from './components/dashboard/dash-home/dash-home.component';
import {MatPaginatorModule} from '@angular/material/paginator';




export function PegarToken(){
  return localStorage.getItem('tokenUsuario');
}


const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    TituloComponent,
    RegistrarUsuarioComponent,
    AtualizarUsuarioComponent,
    ListarUsuariosComponent,
    PerfilComponent,
    ExcluirUsuarioComponent,
    ListarCategoriasComponent,
    CadastrarCategoriasComponent,
    AtualizarCategoriasComponent,
    ExcluirCategoriasComponent,
    ListarFornecedoresComponent,
    CadastrarFornecedorComponent,
    AtualizarFornecedorComponent,
    ExcluirFornecedorComponent,
    HomeComponent,
    ListarProdutosComponent,
    CadastrarProdutosComponent,
    AtualizarProdutosComponent,
    ExcluirProdutosComponent,
    NotfoundComponent,
    ProdutosCategoriaComponent,
    ComprasProdutosComponent,
    ProdutosDestaqueComponent,
    ProdutoDetalheComponent,
    CarrinhoUsuarioComponent,
    ProdutoImagemDestaqueComponent,
    DashHomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatSnackBarModule,
    NgxMaskModule.forRoot(maskConfig),
    MatListModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: PegarToken
      }
    }),
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    MatSelectModule,
    MatTooltipModule,
    MatCheckboxModule,
    NgxSpinnerModule,
    MatDialogModule,
    MatBottomSheetModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatBadgeModule,
    MatPaginatorModule


  ],
  providers: [
    UsuarioService,
    AutorizaService,
    PerfilService,
    CategoriaService,
    FornecedorService,
    ProdutoService,
    CarrinhoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
