using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Models;

namespace estoque.domain.IServices
{
    public interface IPedidoService
    {
        Task<Pedido> Cadastrar(PedidoDto pedido);
        Task<object> Deletar(int id);
        Task<IEnumerable<Pedido>> getAllPedidos();
        Task<IEnumerable<Pedido>> GetAll(int skip =0, int take = 5);
        Task<IEnumerable<PedidoDtoGetAll>> getPedidosByUserId(int userId);
        Task<Pedido> CarregarPedidoById(int pedidoId);


        
        
    }
}