using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Interfaces
{
    public interface ICategoriaRepository : IRepositoryGeneric<Categoria>
    {
        Task<IEnumerable<Categoria>> CarregarCategoriaPorNome(string categoriaNome);
        Task<Categoria> VerificaCategoriaExistente(string categoriaNome);
        




       
    }
}