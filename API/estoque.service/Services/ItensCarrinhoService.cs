using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Enums;
using estoque.domain.Interfaces;
using estoque.domain.IServices;
using estoque.domain.Models;

namespace estoque.service.Services {
    public class ItensCarrinhoService : IitensCarrinhoService {
        private readonly IitensCarrinhoRepository _itensCarrinho;
        private readonly IProdutoRepository _produto;

        public ItensCarrinhoService(IitensCarrinhoRepository itensCarrinho, IProdutoRepository produto) {
            _itensCarrinho = itensCarrinho;
            _produto = produto;
        }

        public async Task<List<ItensCarrinho>> Cadastrar(List<ItensCarrinho> itensCarrinho) {
            try {
                if (itensCarrinho != null) {

                    foreach (var item in itensCarrinho) {
                        //Guid idx = Guid.NewGuid();
                        //item.Id = BitConverter.ToInt32(idx.ToByteArray());
                        
                        await _itensCarrinho.Cadastrar(item);
                        //var pegarProduto = await _produto.GetById(item.ProdutoId);
                        //if (pegarProduto.QuantidadeEstoque >= item.Quantidade) {
                          //  var quantidadeAtualizada = pegarProduto.QuantidadeEstoque - item.Quantidade;
                           // pegarProduto.QuantidadeEstoque = quantidadeAtualizada;
                            //await _produto.Atualizar(pegarProduto);

                            //item.Id = item.Id++;

                            //item.Id = item.Id++;


                        //}
                    }
                }
                return itensCarrinho;
            } catch (Exception ex) {

                throw ex;
            }
        }
    }
}