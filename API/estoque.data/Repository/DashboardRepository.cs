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

    public class Contador
    {
        public int categorias { get; set; }
        public int produtos { get; set; }
        public int fornecedores { get; set; }
        public int pedidos { get; set; }
        public int usuarios { get; set; }

    }

    public class ValoresPedidos
    {
        public List<int> PedidoId { get; set; }
        public List<double> Valor { get; set; }


    }
    public class DashboardRepository : IDashboardRepository
    {

        private readonly AppDbContext _context;
        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<object> Contador()
        {
            try
            {

                Contador contador = new Contador();

                contador.categorias = await _context.Categorias
                       .Where(x => x.Deleted != true)
                       .CountAsync();

                contador.fornecedores = await _context.Fornecedores
                    .Where(x => x.Deleted != true)
                    .CountAsync();

                contador.pedidos = await _context.Pedidos
                       .Where(x => x.Deleted != true)
                       .CountAsync();

                contador.produtos = await _context.Produtos
                        .Where(x => x.Deleted != true)
                        .CountAsync();

                contador.usuarios = await _context.Usuarios
                        .Where(x => x.Deleted != true)
                        .CountAsync();

                return contador;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> ValoresPedidos()
        {
            try
            {

                ValoresPedidos valores = new ValoresPedidos();
                valores.PedidoId = await _context.Pedidos.Select(x => x.Id).ToListAsync();
                valores.Valor = await _context.Pedidos.Select(x => x.ValorTotal).ToListAsync();
                return valores;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}