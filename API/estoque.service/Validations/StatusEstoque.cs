using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.service.Validations
{
    public class StatusEstoque
    {
        public string Mensagem { get; set; }
        public double Situacao { get; set; }
        public object Objeto { get; set; }

        public StatusEstoque()
        {

        }

        public StatusEstoque(string _mensagem, double _situacao, object _objeto )
        {
            Mensagem = _mensagem;
            Situacao = _situacao;
            Objeto = _objeto;
        }
    }





}