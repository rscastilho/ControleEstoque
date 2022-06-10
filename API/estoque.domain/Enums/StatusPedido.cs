using System.ComponentModel;

namespace estoque.domain.Enums
{
    public enum StatusPedido
    {
        [Description("Pedido realizado com sucesso!")]
        PedidoRealizadoComSucesso,
        [Description("Pedido autorizado!")]
        PedidoAutorizado,
        [Description("Aguardando confirmação de pagamento!")]
        AguardandoConfirmacaoPagamento,
        [Description("Pagamento Aprovado!")]
        PagamentoAprovado,
        [Description("Produtos em separação!")]
        ProdutosSeparacao,
        [Description("Saiu para entrega. Em transporte!")]
        EmTransporte,
        [Description("Entrega realizada!")]
        Entregue,
        [Description("Pedido cancelado!")]
        PagamentoCancelado
    }
}