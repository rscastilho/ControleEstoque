using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Interfaces
{
    public interface IFornecedorRepository : IRepositoryGeneric<Fornecedor>
    {
     Task<IEnumerable<Fornecedor>> CarregarFornecedorPorNome(string fornecedorNome);
     Task<Fornecedor> CarregarFornecedorPorCNPJ(string cnpj);
     

    }
}