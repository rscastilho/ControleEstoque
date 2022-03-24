using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Dtos
{
    public class UsuarioDtoCreate
    {
        [Required(ErrorMessage ="Campo {0} de preenchimento obrigatório")]
        [StringLength(60,ErrorMessage ="Quantidade máxima de {1} caracteres, use menos caracteres" )]
        public string Nome { get; set; }
        
        [Required(ErrorMessage ="Campo {0} de preenchimento obrigatório")]
        [StringLength(100,ErrorMessage ="Quantidade máxima de {1} caracteres, use menos caracteres" )]
        [EmailAddress(ErrorMessage ="Campo {0} deve ter o formato de email")]
        public string Email { get; set; }

        
        [Required(ErrorMessage ="Campo {0} de preenchimento obrigatório")]
        [StringLength(15,ErrorMessage ="Quantidade máxima de {1} caracteres, use menos caracteres" )]
        public string CPF { get; set; }

        [Required(ErrorMessage ="Campo {0} de preenchimento obrigatório")]
        [StringLength(20,ErrorMessage ="Quantidade máxima de {1} caracteres, use menos caracteres" )]
        [DataType(DataType.Password)]
        public string Senha { get; set; }
        
    }
}