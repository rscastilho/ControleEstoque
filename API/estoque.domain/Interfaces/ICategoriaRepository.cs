using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Interfaces
{
    public interface ICategoriaRepository : IRepositoryGeneric<Categoria>
    {
        Task<Categoria> CarregarCategoriaPorNome(string categoriaNome);



       
    }
}