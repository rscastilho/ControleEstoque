using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Dtos
{
    public class CategoriaDtoCreateResult
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        private DateTime CreateAt {get; set;}
    }
}