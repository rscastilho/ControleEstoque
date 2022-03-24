using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;

namespace estoque.domain.Dtos
{
    public class ProdutoDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public int QuantidadeEstoque { get; set; }
        public int QuantidadeMinima { get; set; }
        public double Valor { get; set; }
        public double ValorTotal { get; set; }
        public int CategoriaId { get; set; }
        public virtual Categoria Categoria { get; set; }
        public string ImagemUrl { get; set; }
        public string ImagemDestaque { get; set; }
        public bool DestacarImagem { get; set; }
        public int FornecedorId { get; set; }
        public virtual Fornecedor  Fornecedor { get; set; }
               
        
    }
}