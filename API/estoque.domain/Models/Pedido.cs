using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Models
{
    public class Pedido: BaseModel
    {

        public int UsuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public IEnumerable<Produto> Produtos { get; set; }
        public double ValorTotal { get; set; }
        
        
    }
}