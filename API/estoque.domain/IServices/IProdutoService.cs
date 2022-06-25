using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Models;

namespace estoque.domain.IServices
{
    public interface IProdutoService
    {
        Task<object> Atualizar(ProdutoDtoUpdate produto);
        Task<object> Cadastrar(ProdutoDtoCreate produto);
        Task<object> Deletar(int id);
        Task<IEnumerable<ProdutoDto>> GetAll(int skip =0, int take = 5);
        Task<IEnumerable<ProdutoDto>> GetAllCategoria(int skip =0, int take = 5);
        Task<object> CarregarProdutoById(int produtoId);
        Task<IEnumerable<ProdutoDto>> CarregarProdutoByNome(string produtoNome);
        Task<int> ContarProdutosPorCategoria(int categoriaId);

        Task<int> ContarProdutos();
        Task<IEnumerable<ProdutoDto>> CarregarProdutoPorCategoriaId(int categoriaId);

        Task<object> CadastrarImagemDestaque(ProdutoDtoUpdate produto);

        Task<IEnumerable<ProdutoDto>> CarregarImagensDestaque();

        Task<Object> StatusEstoque();
        
        
    }
}