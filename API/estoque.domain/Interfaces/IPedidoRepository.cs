using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Interfaces
{
    public interface IPedidoRepository : IRepositoryGeneric<Pedido>
    {
     Task<IEnumerable<Pedido>> getAllPedidos();
     Task<IEnumerable<Pedido>> getPedidosByUserId(int userId, int skip, int take);
     Task<Pedido> CarregarPedidoById(int pedidoId);

     Task<int> ContadorPedidoByUserId(int userId);

          
    }
}