using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Models
{
    public class Produto: BaseModel
    {
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        [StringLength(60, MinimumLength =3, ErrorMessage ="Quantidade de caracteres insuficiente")]
        public string Descricao { get; set; }
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        [Range(0, int.MaxValue, ErrorMessage ="Informações inválidas")]
        public int QuantidadeEstoque { get; set; }
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        [Range(0, int.MaxValue, ErrorMessage ="Informações inválidas")]
        public int QuantidadeMinima { get; set; }
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        public double Valor { get; set; }
        
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        public double ValorTotal { get; set; }

        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        public int CategoriaId { get; set; }
        public virtual Categoria Categoria { get; set; }
        
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        [FileExtensions(Extensions ="jpg| gif| png", ErrorMessage ="Extensão invalida de imagem")]
        public string ImagemUrl { get; set; }

        public string ImagemDestaque { get; set; }

        public bool DestacarImagem { get; set; }


        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        public int FornecedorId { get; set; }
        public virtual Fornecedor Fornecedor { get; set; }
                
    }
}