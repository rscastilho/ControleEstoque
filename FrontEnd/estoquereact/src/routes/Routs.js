
import { Routes, Route, Navigate } from 'react-router-dom'
import PageNotFound from '../pages/pageNotFound/PageNotFound';


//paginas
import Login from '../pages/users/login/Login'
import Register from '../pages/users/register/Register'
import ListagemCategorias from './../pages/categorias/ListagemCategorias/ListagemCategorias';

import { useContext } from 'react';

import { AutContext } from '../context/AutContext';
import ListarProdutos from '../pages/Produtos/ListarProdutos/ListarProdutos';
import ListarFornecedores from './../pages/fornecedores/ListarFornecedores/ListarFornecedores';
import ListarUsers from './../pages/users/ListarUsers/ListarUsers';
import CadastrarCategoria from './../pages/categorias/CadastrarCategoria/CadastrarCategoria';
import ProdutosCompras from './../pages/Produtos/ProdutosComprar/ProdutosCompras';
import Dashboard from '../pages/Dashboard/Dashboard';
import Carrinho from '../pages/Produtos/Carrinho/Carrinho';
import FinalizarPedido from '../pages/Produtos/FinalizarPedido/FinalizarPedido';
import PedidosById from '../pages/Pedidos/PedidosById/PedidosById';


const Routs = () => {
  const { authentication } = useContext(AutContext)
  return (
    <>

      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route exact path='/' element={authentication ? <ProdutosCompras /> : <Navigate to='/login' />} />

        <Route path='/listarprodutos' element={authentication ? <ListarProdutos /> : <Navigate to='/login' />} />
        <Route path='/carrinho' element={authentication ? <Carrinho /> : <Navigate to='/login' />} />
        <Route path='/finalizarpedido' element={authentication ? <FinalizarPedido /> : <Navigate to='/login' />} />

        <Route path='/pedidos' element={authentication ? <PedidosById /> : <Navigate to='/login' />} />

        <Route path='/listagemfornecedores' element={authentication ? <ListarFornecedores /> : <Navigate to='/login' />} />
        <Route path='/cadastrarfornecedor' element={authentication ? <ListarFornecedores /> : <Navigate to='/login' />} />

        <Route path='/listagemusuarios' element={authentication ? <ListarUsers /> : <Navigate to='/login' />} />

        <Route path='/listagemcategorias' element={authentication ? <ListagemCategorias /> : <Navigate to='/login' />} />
        <Route path='/cadastrarcategoria' element={authentication ? <CadastrarCategoria /> : <Navigate to='/login' />} />

        <Route path='/dashboard' element={authentication ? <Dashboard /> : <Navigate to='/login' />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>

    </>
  )
}

export default Routs