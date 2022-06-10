using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.IServices
{
    public interface IEmailService
    {
       Task EnviarEmail(string email, string assunto, string mensagem);
    }
}