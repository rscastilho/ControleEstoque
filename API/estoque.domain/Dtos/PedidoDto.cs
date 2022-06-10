using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Enums;
using estoque.domain.Models;

namespace estoque.domain.Dtos
{
    public class PedidoDto
    {
        public int UsuarioId { get; set; }
        public List<ItensCarrinhoDtoCreate> ItensCarrinho { get; set; }
        public double ValorTotal { get; set; }
        public TipoPagamento TiposPagamentos { get; set; }
        public StatusPedido StatusPedidos { get; set; }
    }
}