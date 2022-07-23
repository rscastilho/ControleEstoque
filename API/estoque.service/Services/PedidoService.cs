using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using estoque.domain.Dtos;
using estoque.domain.Enums;
using estoque.domain.Interfaces;
using estoque.domain.IServices;
using estoque.domain.Models;

namespace estoque.service.Services
{
    public class PedidoService : IPedidoService
    {
        private readonly IPedidoRepository _pedido;
        private readonly IitensCarrinhoService _itensCarrinho;
        private readonly IProdutoRepository _produto;
        private readonly IMapper _mapper;
        private readonly IEmailService _email;
        private readonly IUsuarioRepository _usuario;

        public PedidoService(IPedidoRepository pedido, IitensCarrinhoService itensCarrinho, IProdutoRepository produto, IMapper mapper, IEmailService email, IUsuarioRepository usuario)
        {
            _pedido = pedido;
            _itensCarrinho = itensCarrinho;
            _produto = produto;
            _mapper = mapper;
            _email = email;
            _usuario = usuario;
        }


        private void ValidarPedido(PedidoDto pedido)
        {
            try
            {
                if (pedido.ItensCarrinho.Count <= 0 || pedido == null)
                {
                    throw new Exception("informe um item");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private async void ValidarItens(List<ItensCarrinho> itensCarrinho)
        {
            try
            {
                foreach (var item in itensCarrinho)
                {
                    var resultado = (Produto)await _produto.GetById(item.ProdutoId);
                    if (resultado.QuantidadeEstoque <= item.Quantidade)
                    {
                        throw new Exception(string.Format("quantidade do produto {0} invalido", resultado.Descricao));
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //funcao criada para pegar as informacoes de descricao do enum enviada no email
        private string decriptarEnum(Enum value)
        {
            FieldInfo fi = value.GetType().GetField(value.ToString());
            DescriptionAttribute[] attributes = fi.GetCustomAttributes(typeof(DescriptionAttribute), false) as DescriptionAttribute[];
            if (attributes != null && attributes.Any())
            {
                return attributes.First().Description;
            }
            return value.ToString();
        }

        private async void EnviarEmail(
            string emailUser,
            string userName,
            int pedidoId,
            double valorTotal,
            Enum tipoPagamento,
            Enum statusPedido)
        {
            try
            {
                Enum valueStatusPedido = statusPedido;
                string statusPedidoEnum = decriptarEnum((StatusPedido)valueStatusPedido);

                Enum valueTipoPagamento = tipoPagamento;
                string tipoPagamentoEnum = decriptarEnum((TipoPagamento)valueTipoPagamento);

                string assunto = $"Pedido recebido com sucesso! numero: {pedidoId}";
                string mensagem =
                $@"
                <hr>
                <h2>Olá {userName.ToUpper()},</h2> 
                <h3> Seu pedido número {pedidoId} foi gerado com sucesso. </h3></br> 
                <strong> Valor: </strong> R$ {valorTotal}</br>
                <strong> Pagamento:</strong> {tipoPagamentoEnum} </br> 
                <strong> Status do pedido:</strong> {statusPedidoEnum} </br>
                </br></br></br></br></br>
                <hr>
                Agradecemos seu pedido </br> 
                <strong>by rcastilho@gmail.com </strong>";

                await _email.EnviarEmail(emailUser, assunto, mensagem);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<Pedido> Cadastrar(PedidoDto pedido)
        {
            try
            {
                ValidarPedido(pedido);

                Produto pegaItem = new Produto();
                var pedidoMapeado = _mapper.Map<Pedido>(pedido);
                var pedidoFinal = _mapper.Map<Pedido>(pedidoMapeado);
                pedidoMapeado.ValorTotal = 0;
                foreach (var item in pedidoMapeado.ItensCarrinho)
                {
                    pegaItem = await _produto.GetById(item.ProdutoId);
                    if (pegaItem.QuantidadeEstoque >= item.Quantidade)
                    {
                        pegaItem.QuantidadeEstoque = pegaItem.QuantidadeEstoque - item.Quantidade;

                    }
                    else if (pegaItem.QuantidadeEstoque < 1)
                    {
                        item.Quantidade = pegaItem.QuantidadeEstoque;
                        item.Valor = pegaItem.Valor * 0;
                        await _pedido.Cadastrar(pedidoMapeado);
                        return pedidoFinal;
                    }
                    else
                    {
                        return pedidoFinal;
                    }
                    {
                    }
                    pedidoMapeado.ValorTotal += item.Valor * item.Quantidade;
                }

                await _produto.Atualizar(pegaItem);

                var result = await _pedido.Cadastrar(pedidoMapeado);
                var usuario = await _usuario.GetById(pedidoMapeado.UsuarioId);

                EnviarEmail(
                        usuario.Email,
                        usuario.Nome,
                        pedidoMapeado.Id,
                        pedidoMapeado.ValorTotal,
                        pedidoMapeado.TiposPagamentos,
                        pedidoMapeado.StatusPedidos
                    );

                // await Task.Delay(20000);
                // await StatusPedido(pedidoMapeado,
                //     usuario.Email,
                //     usuario.Nome,
                //     pedidoMapeado.Id,
                //     pedidoMapeado.ValorTotal,
                //     pedidoMapeado.TiposPagamentos,
                //     pedidoMapeado.StatusPedidos);

                return pedidoFinal;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<Pedido> StatusPedido(
            Pedido pedido,
            string emailUser,
            string userName,
            int pedidoId,
            double valorTotal,
            Enum tipoPagamento,
            Enum statusPedido)
        {
            try
            {
                var pedidoMapeado = _mapper.Map<Pedido>(pedido);
                pedidoMapeado.StatusPedidos = domain.Enums.StatusPedido.PedidoAutorizado;
                var resultado = await _pedido.Atualizar(pedidoMapeado);
                EnviarEmail(emailUser, userName, pedidoId, valorTotal, tipoPagamento, pedidoMapeado.StatusPedidos);

                return pedidoMapeado;
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<Pedido> CarregarPedidoById(int pedidoId)
        {
            try
            {
                var resultado = await _pedido.GetById(pedidoId);
                return resultado;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<object> Deletar(int id)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                var resultado = await _pedido.Deletar(id);
                resultadoFinal.Mensagem = "Pedido deletado com sucesso!";
                resultadoFinal.Usuario = resultado;
                return resultadoFinal;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public async Task<IEnumerable<Pedido>> GetAll(int skip = 0, int take = 5)
        {
            try
            {
                var resultado = await _pedido.GetAll(skip, take);
                return resultado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<Pedido>> getAllPedidos()
        {
            try
            {
                var resultado = await _pedido.getAllPedidos();
                return resultado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        public async Task<IEnumerable<PedidoDtoGetAll>> getPedidosByUserId(int userId, int skip, int take)
        {
            try
            {
                var resultado = await _pedido.getPedidosByUserId(userId, skip, take);
                var pedidoMapeado = _mapper.Map<IEnumerable<PedidoDtoGetAll>>(resultado);
                return pedidoMapeado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<int> ContadorPedidoByUserId(int userId)
        {
            try
            {
                var resultado = await _pedido.ContadorPedidoByUserId(userId);
                return resultado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<PedidoDtoGetAll>> GetPedidosPorData(DateTime dataInicial, DateTime dataFinal)
        {
            try
            {
                if (dataInicial == null && dataFinal == null)
                {
                    var result = await _pedido.GetAll(0,1000);
                    var pedidoMap = _mapper.Map<IEnumerable<PedidoDtoGetAll>>(result);
                    return pedidoMap;
                }else{

                var resultado = await _pedido.GetPedidosPorData(dataInicial, dataFinal);
                if (resultado == null) return null;
                var pedidoMapeado = _mapper.Map<IEnumerable<PedidoDtoGetAll>>(resultado);
                return pedidoMapeado;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}