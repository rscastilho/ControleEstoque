using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Models
{
    public class ItensCarrinho : BaseModel
    {
        
        public int PedidoId { get; set; }
        public int ProdutoId { get; set; }
        public Produto Produto { get; set; }
        public virtual IEnumerable<Produto> Produtos { get; set; }
        public int Quantidade { get; set; }
        public double Valor { get; set; }

    }
}