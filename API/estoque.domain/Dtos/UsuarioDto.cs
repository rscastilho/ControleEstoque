using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Dtos
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public DateTime UltimoAcesso { get; set; }
        public bool Blocked { get; set; }
        public DateTime BlockeAt { get; set; }
        
        
        
          
    }
}