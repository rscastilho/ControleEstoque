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
    public class PerfilRepository: IPerfilRepository
    {

        private readonly AppDbContext _context;

        public PerfilRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Perfil> AtualizarPerfil(Perfil perfil)
        {
          

          var resultado = await _context.Perfis.FirstOrDefaultAsync(x => x.UsuarioId == perfil.UsuarioId);
          resultado.UsuarioId = perfil.UsuarioId;
          resultado.Funcoes = perfil.Funcoes;
          
          
          _context.Perfis.Update(resultado);
          _context.SaveChanges();

          return resultado;

        }

        public async Task<Perfil> CadastrarPerfil(Perfil perfil)
        {
            if (perfil == null) return null;
            _context.Set<Perfil>().Add(perfil);
            await _context.SaveChangesAsync();
            return perfil;
        }

        public async Task<Perfil> CarregarPerfilPorId(int usuarioId)
        {
            return await _context.Perfis.FirstOrDefaultAsync(x => x.UsuarioId == usuarioId);
        }

        public async Task<IEnumerable<Perfil>> ListarTodosPerfis()
        {
            return await _context.Perfis.ToListAsync();
        }

        public async Task<bool> VerificaPerfilCadastrado()
        {
            var resultado = await _context.Set<Perfil>().ToListAsync();

            if (resultado.Count < 1 )
                {
                return false;
            } else
            {
                return true;
            }

        }
    }
}
