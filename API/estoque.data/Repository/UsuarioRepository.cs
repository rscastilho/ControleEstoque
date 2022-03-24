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
    public class UsuarioRepository : RepositoryGeneric<Usuario>, IUsuarioRepository
    {
        private readonly AppDbContext _context;
        public UsuarioRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<Usuario> GetByEmail(string email)
        {
            var resultado = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email.Equals(email));
            return resultado;
        }

    //esta pegando a senha de expiração e enviando para o atualizar usuario. estava atualizando o usuario quando desbloqueava e o campo ficava em branco
        public async Task<string> PegarSenhaPorId(int id)
        {
            var resultado = await _context.Usuarios.FirstOrDefaultAsync(x => x.Id == id);
            return resultado.Senha.ToString();
            
                    }
        //esta pegando a data de expiração e enviando para o atualizar usuario. estava atualizando o usuario quando desbloqueava e o campo ficava em branco
         public async Task<string> PegarDataExpiraId(int id)
        {
            var resultado = await _context.Usuarios.FirstOrDefaultAsync(x => x.Id == id);
            return resultado.PasswordExpirationDate.ToString();
            
                    }

        public async Task<bool> VerificaCPF(string cpf)
        {
            return await _context.Usuarios.AnyAsync(x => x.CPF.Equals(cpf));
        }

        public async Task<bool> VerificaEmail(string email)
        {
            return await _context.Usuarios.AnyAsync(x => x.Email.Equals(email));
        }

        public async Task<IEnumerable<Usuario>> CarregarUsuarioPorNome(string nome)
        {
            var resultado = await _context.Usuarios.Where(x => x.Nome.Contains(nome)).ToListAsync();
            return resultado;
        }
    }
}