using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.data.Context;
using estoque.domain.Interfaces;
using estoque.domain.Models;

namespace estoque.data.Repository
{
    public class ItensCarrinhoRepository : RepositoryGeneric<ItensCarrinho>, IitensCarrinhoRepository
    {

        private readonly AppDbContext _context;

        public ItensCarrinhoRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        // public async Task<ItensCarrinho> getbyId(int id)
        // {
        //     return await _context.ItensCarrinho.FindAsync(id);
            
        // }
    }
}