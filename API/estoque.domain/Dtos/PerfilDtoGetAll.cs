using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Enums;

namespace estoque.domain.Dtos
{
    public class PerfilDtoGetAll
    {
         
        public int UsuarioId { get; set; }
        public Funcoes Funcoes { get; set; }
    }
}