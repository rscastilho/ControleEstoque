using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Dtos
{
    public class PedidoDtoCreate
    {
        public int UsuarioId { get; set; }
        public List<ItensCarrinhoDtoCreate> ItensCarrinho { get; set; }
        public double ValorTotal { get; set; }
    }
}