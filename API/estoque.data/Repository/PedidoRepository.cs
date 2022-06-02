using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.data.Context;
using estoque.domain.Interfaces;
using estoque.domain.Models;
using Microsoft.EntityFrameworkCore;

namespace estoque.data.Repository
{
    public class PedidoRepository : RepositoryGeneric<Pedido>, IPedidoRepository
    {

        private readonly AppDbContext _context;
        public PedidoRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Pedido> CarregarPedidoById(int pedidoId)
        {
            var resultado = await _context.Pedidos
            //.Include(x => x.ItensCarrinho)
            
            .Include(x => x.ItensCarrinho)
            .FirstOrDefaultAsync(x=> x.Id == pedidoId);
            
            return resultado;
        }

        public async Task<IEnumerable<Pedido>> getAllPedidos()
        {
            var resultado = await _context.Pedidos.AsNoTracking().ToListAsync();
            return resultado;
        }

        public async Task<IEnumerable<Pedido>> getPedidosByUserId(int userId)
        {
            var resultado = await _context.Pedidos
                                            .Include(x => x.ItensCarrinho)
                                            .ThenInclude(x=> x.Produto)
                                            .Where(x => x.UsuarioId == userId)
                                            .OrderByDescending(x=> x.CreateAt)
                                            .AsNoTracking()
                                            .ToListAsync();
            return resultado;
        }
    }
}