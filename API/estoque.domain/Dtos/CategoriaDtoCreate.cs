using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Dtos
{
    public class CategoriaDtoCreate
    {
        [Required(ErrorMessage ="Campo {0} preenchimento obrigatório!")]
        [StringLength(60, MinimumLength =3, ErrorMessage ="Quantidade de caracteres inválidos")]
        public string Descricao { get; set; }
    }
}