using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Enums;

namespace estoque.domain.IServices
{
    public interface ILoginService
    {
        Task<Object> UsuarioPorEmail(LoginDto email);
        Task<string> GerarJwt(string email);

        Task<UsuarioDtoCreateResult> Logar(LoginDto login);


        Task<object> Logando(LoginDto login);

        

        

    }
}