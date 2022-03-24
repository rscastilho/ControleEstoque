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
    public class CategoriaRepository : RepositoryGeneric<Categoria>, ICategoriaRepository

    {

        private readonly AppDbContext _context;


        public CategoriaRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Categoria> CarregarCategoriaPorNome(string categoriaNome)
        {
            try
            {
                return await _context.Categorias.SingleOrDefaultAsync(x => x.Descricao.Equals(categoriaNome) && x.Deleted != true);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }

}