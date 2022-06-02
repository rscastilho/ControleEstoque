using System;
using System.Collections.Generic;
using System.Linq;
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

        public PedidoService(IPedidoRepository pedido, IitensCarrinhoService itensCarrinho, IProdutoRepository produto, IMapper mapper)
        {
            _pedido = pedido;
            _itensCarrinho = itensCarrinho;
            _produto = produto;
            _mapper = mapper;
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
                return pedidoFinal;

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


        public async Task<IEnumerable<PedidoDtoGetAll>> getPedidosByUserId(int userId)
        {
            try
            {
                var resultado = await _pedido.getPedidosByUserId(userId);
                var pedidoMapeado = _mapper.Map<IEnumerable<PedidoDtoGetAll>>(resultado);
                return pedidoMapeado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}