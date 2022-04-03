using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.data.Context;
using estoque.domain.Dtos;
using estoque.domain.Interfaces;
using estoque.domain.Models;
using Microsoft.EntityFrameworkCore;

namespace estoque.data.Repository
{
    public class ProdutoRepository : RepositoryGeneric<Produto>, IProdutoRepository
    {
        private readonly AppDbContext _context;
        public ProdutoRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Produto>> CarregarImagensDestaque()
        {
            try
            {
                return await _context.Produtos.Where(x => x.DestacarImagem == true).ToListAsync();
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<IEnumerable<Produto>> CarregarProdutoByNome(string produtoNome)
        {
            try
            {
                var resultado = await _context.Produtos.Include(x => x.Categoria).Where(x => x.Descricao.Contains(produtoNome)).ToListAsync();
                return resultado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<Produto>> CarregarProdutoPorCategoriaId(int categoriaId)
        {
            try
            {
                var resultado = await _context.Produtos.Where(x => x.CategoriaId == categoriaId).ToListAsync();
                return resultado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<int> ContarProdutosPorCategoria(int categoriaId)
        {
            try
            {
                return await _context.Produtos.CountAsync(x => x.CategoriaId == categoriaId);

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<Produto>> GetAllCategoria(int skip =0, int take = 5)
        {
            try
            {
                var resultado = await _context.Produtos.Include(x => x.Categoria)
                .Include(x => x.Fornecedor)
                .Where(x => x.DeleteAt == null)
                .AsNoTracking()
                .Skip(skip)
                .Take(take)
                .ToListAsync();
                return resultado;
            }
            catch (System.Exception)
            {

                throw;
            }
        }
    }
}