using System.ComponentModel;

namespace estoque.domain.Enums
{
    public enum TipoPagamento
    {
        [Description ("Cartão de crédito") ]
        CartaoCredito,
        [Description ("Boleto bancário") ]
        Boleto,
        [Description ("PIX") ]
        PIX,
        [Description ("Debito em conta corrente") ]
        DebitoConta
    }
}