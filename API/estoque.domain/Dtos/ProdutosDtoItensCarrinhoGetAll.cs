using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Dtos
{
    public class ProdutosDtoItensCarrinhoGetAll
    {

        public int Id { get; set; }
        public virtual ProdutoDtoItensCarrinho Produto { get; set; }
        public string Descricao { get; set; }
        public double Valor { get; set; }
        public double ValorTotal { get; set; }
        public string ImagemUrl { get; set; }
        
    }
}