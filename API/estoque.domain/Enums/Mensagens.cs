using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Enums
{
    public class Mensagens
    {
        public Mensagens()
        {
            
        }

        public Mensagens(string mensagem, object tokenUsuario, object usuario)
        {
            Mensagem = mensagem;
            TokenUsuario = tokenUsuario;
            Usuario = usuario;
        }

        public string Mensagem { get; set; }
        public object TokenUsuario { get; set; }
        public object Usuario { get; set; }
    }
}