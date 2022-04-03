import { DashHomeComponent } from './components/dashboard/dash-home/dash-home.component';
import { ProdutoImagemDestaqueComponent } from './components/produto/produto-imagem-destaque/produto-imagem-destaque.component';
import { CarrinhoUsuarioComponent } from './components/usuario/carrinho-usuario/carrinho-usuario.component';
import { ProdutosCategoriaComponent } from './components/produto/produtos-categoria/produtos-categoria.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AutorizaService } from './services/auth.service';
import { AtualizarProdutosComponent } from './components/produto/atualizar-produtos/atualizar-produtos.component';
import { CadastrarProdutosComponent } from './components/produto/cadastrar-produtos/cadastrar-produtos.component';
import { ListarProdutosComponent } from './components/produto/listar-produtos/listar-produtos.component';
import { HomeComponent } from './components/home/home.component';
import { CadastrarFornecedorComponent } from './components/fornecedor/cadastrar-fornecedor/cadastrar-fornecedor.component';
import { AtualizarFornecedorComponent } from './components/fornecedor/atualizar-fornecedor/atualizar-fornecedor.component';
import { ListarFornecedoresComponent } from './components/fornecedor/listar-fornecedores/listar-fornecedores.component';
import { ListarCategoriasComponent } from './components/categoria/listar-categorias/listar-categorias.component';
import { CadastrarCategoriasComponent } from './components/categoria/cadastrar-categorias/cadastrar-categorias.component';
import { AtualizarCategoriasComponent } from './components/categoria/atualizar-categorias/atualizar-categorias.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { ListarUsuariosComponent } from './components/usuario/listar-usuarios/listar-usuarios.component';
import { AtualizarUsuarioComponent } from './components/usuario/atualizar-usuario/atualizar-usuario.component';
import { RegistrarUsuarioComponent } from './components/usuario/registrar-usuario/registrar-usuario.component';
import { LayoutComponent } from './components/shared/layout/layout.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes =[

        {path:"login", component: LoginComponent},
        {path:"registrar", component: RegistrarUsuarioComponent},
        // {path: "**" , component: NotfoundComponent },

        {path:"", component: LayoutComponent, canActivate: [AutorizaService], children:[
          {path:"home" , component: HomeComponent},
          {path:"atualizarUsuario/:id" , component: AtualizarUsuarioComponent},
          {path:"listarusuarios", component: ListarUsuariosComponent},
          {path:"perfil/:id" , component: PerfilComponent},

          {path: "atualizarcategoria/:id", component: AtualizarCategoriasComponent},
          {path: "cadastrarcategoria", component: CadastrarCategoriasComponent},
          {path: "listarcategorias", component: ListarCategoriasComponent},

          {path: "listarfornecedores", component: ListarFornecedoresComponent},
          {path: "atualizarfornecedor/:id", component: AtualizarFornecedorComponent},
          {path: "cadastrarfornecedor", component: CadastrarFornecedorComponent},

          {path: "listarprodutos", component: ListarProdutosComponent},
          {path: "cadastrarproduto", component: CadastrarProdutosComponent},
          {path: "atualizarproduto/:id", component: AtualizarProdutosComponent},
          {path: "produtosporcategoria/:id", component: ProdutosCategoriaComponent},
          {path: "carrinho", component: CarrinhoUsuarioComponent},
          {path: "produtoimagemdestaque/:id", component: ProdutoImagemDestaqueComponent},

          {path: "dashHome", component: DashHomeComponent},


          {path: "**" , component: NotfoundComponent },


        ]}
      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
