using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Models;

namespace estoque.domain.Interfaces
{
    public interface IProdutoRepository: IRepositoryGeneric<Produto>
    {

        Task<IEnumerable<Produto>> CarregarProdutoByNome(string produtoNome);

        Task<IEnumerable<Produto>> GetAllCategoria();

        Task<int> ContarProdutosPorCategoria(int categoriaId);
        Task<IEnumerable<Produto>> CarregarProdutoPorCategoriaId(int categoriaId);
        Task<IEnumerable<Produto>> CarregarImagensDestaque();

       

        

        
    
        
    }
}