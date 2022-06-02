using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Dtos
{
    public class ProdutoDtoItensCarrinho
    {
        public int Id { get; set; }
        
        public int Quantidade { get; set; }

        public double Valor { get; set; }
        
        
    }
}