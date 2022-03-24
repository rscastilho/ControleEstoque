using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Interfaces
{
    public interface IPerfilRepository
    {
        Task<Perfil> CadastrarPerfil(Perfil perfil);
        Task<bool> VerificaPerfilCadastrado();
        Task<Perfil> CarregarPerfilPorId(int usuarioId);

        Task<IEnumerable<Perfil>> ListarTodosPerfis();
        Task<Perfil> AtualizarPerfil(Perfil perfil);
    }
}