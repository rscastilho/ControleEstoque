using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Interfaces
{
    public interface IUsuarioRepository: IRepositoryGeneric<Usuario>
    {
        Task<Usuario> GetByEmail(string email);
        Task<bool> VerificaEmail(string email);
        Task<bool> VerificaCPF(string cpf);

        Task<string> PegarSenhaPorId(int id);
        Task<string> PegarDataExpiraId(int id);

        Task<IEnumerable<Usuario>> CarregarUsuarioPorNome(string nome);



    }
}