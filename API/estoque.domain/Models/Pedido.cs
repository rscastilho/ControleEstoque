using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Enums;

namespace estoque.domain.Models
{
    public class Pedido : BaseModel
    {
        public int UsuarioId { get; set; }
        public List<ItensCarrinho> ItensCarrinho { get; set; }
        public double ValorTotal { get; set; }
        public TipoPagamento TiposPagamentos { get; set; }
        public StatusPedido StatusPedidos { get; set; }

    }
}