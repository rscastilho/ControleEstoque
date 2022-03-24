using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Models
{
    public class Fornecedor: BaseModel
    {
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        [StringLength(60, MinimumLength =3, ErrorMessage ="Quantidade de caracteres insuficiente")]
        public string RazaoSocial { get; set; }
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        [StringLength(20, MinimumLength =3, ErrorMessage ="Quantidade de caracteres insuficiente")]
        public string CNPJ { get; set; }
        public IEnumerable<Produto> Produtos { get; set; }
    }
}