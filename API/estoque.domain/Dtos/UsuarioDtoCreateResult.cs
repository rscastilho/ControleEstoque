using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Dtos
{
    public class UsuarioDtoCreateResult
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public DateTime CreateAt{get; set;}
        public DateTime UltimoAcesso { get; set; }


        
    }
}