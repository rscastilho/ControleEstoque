using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Interfaces;
using estoque.domain.Models;

namespace estoque.domain.IServices
{
    public interface IPerfilService
    {

        Task<object> CadastrarPerfil(Perfil perfil);
        Task<bool> VerificaPerfilCadastrado();
        Task<Perfil> CarregarPerfilPorId(int usuarioId);

        Task<IEnumerable<PerfilDtoGetAll>> ListarTodosPerfis();
        Task<object> AtualizarPerfil(PerfilDtoGetAll perfil);

        
    }
}