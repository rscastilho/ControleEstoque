using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Enums;

namespace estoque.domain.Models
{
    public class Perfil
    {
        public int PerfilId { get; set; }
        public int UsuarioId { get; set; }
        public virtual Usuario Usuario { get; set; }
        public Funcoes Funcoes { get; set; }

        
        
    }
}