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
    public class FornecedorRepository: RepositoryGeneric<Fornecedor>, IFornecedorRepository
    {
        private readonly AppDbContext _context;

        public FornecedorRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Fornecedor> CarregarFornecedorPorCNPJ(string cnpj)
        {
            try
            {
                var resultado = await _context.Fornecedores.SingleOrDefaultAsync(x => x.CNPJ.Equals(cnpj));
                return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<Fornecedor> CarregarFornecedorPorNome(string fornecedorNome)
        {
            try
            {
                var resultado = await _context.Fornecedores
                .FirstOrDefaultAsync(x => x.RazaoSocial.Contains(fornecedorNome) && x.Deleted != true);
               return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<IEnumerable<Fornecedor>> ListarFornecedoresPorNome(string forncedorNome)
        {
            try
            {
                var resultado = await _context.Fornecedores.Where(x => x.RazaoSocial.Contains(forncedorNome)).ToListAsync();
                return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }
}