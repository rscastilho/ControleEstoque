using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.IServices
{
    public interface IitensCarrinhoService
    {
        Task<List<ItensCarrinho>> Cadastrar(List<ItensCarrinho> itensCarrinho);

        
    }
}