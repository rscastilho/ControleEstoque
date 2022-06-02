using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Dtos
{
    public class ItensCarrinhoDtoCreate
    {
        public int ProdutoId { get; set; }
        // public virtual IEnumerable<ProdutoDtoItensCarrinho> Produtos { get; set; }
        public int Quantidade { get; set; }
        public double Valor { get; set; }
    }
}