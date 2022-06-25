using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using estoque.domain.Dtos;
using estoque.domain.Enums;
using estoque.domain.Interfaces;
using estoque.domain.IServices;
using estoque.domain.Models;
using estoque.service.Validations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace estoque.service.Services
{
    public class ProdutoService : IProdutoService
    {
        private readonly IProdutoRepository _produto;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _webenvironment;

        public ProdutoService(IProdutoRepository produto, IMapper mapper, IWebHostEnvironment webenvironment)
        {
            _produto = produto;
            _mapper = mapper;
            _webenvironment = webenvironment;
        }

        public async Task<object> Atualizar(ProdutoDtoUpdate produto)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                var resultado = await _produto.GetById(produto.Id);
                if (resultado == null)
                {
                    resultadoFinal.Mensagem = $"Id {produto.Id} não encontrado!";
                    resultadoFinal.Usuario = produto;
                    return resultadoFinal;
                }
                else
                {
                    var produtoMapeado = _mapper.Map<Produto>(produto);
                    if (resultado.ImagemUrl != produtoMapeado.ImagemUrl)
                    {
                        DeleteImagem(resultado.ImagemUrl);
                    }

                    produtoMapeado.ValorTotal = produtoMapeado.QuantidadeEstoque * produtoMapeado.Valor;

                    var atualiza = await _produto.Atualizar(produtoMapeado);
                    if (atualiza == null)
                    {
                        resultadoFinal.Mensagem = $"Erro ao tentar atualizar produto {produto.Descricao}";
                        resultadoFinal.Usuario = produto;
                        return resultadoFinal;
                    }
                    else
                    {

                        var produtoFinal = _mapper.Map<ProdutoDtoUpdate>(produtoMapeado);
                        resultadoFinal.Mensagem = $"Produto {produto.Descricao} atualizado com sucesso!";
                        resultadoFinal.Usuario = produtoFinal;
                        return resultadoFinal;
                    }
                }

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> Cadastrar(ProdutoDtoCreate produto)
        {
            try
            {

                Mensagens resultadoFinal = new Mensagens();
                if (produto == null)
                {
                    resultadoFinal.Mensagem = "Campos inválidos";
                    resultadoFinal.Usuario = produto;
                    return resultadoFinal;
                }


                var produtoMapeado = _mapper.Map<Produto>(produto);
                produtoMapeado.ValorTotal = produtoMapeado.QuantidadeEstoque * produtoMapeado.Valor;

                var resultado = await _produto.Cadastrar(produtoMapeado);
                var produtoMapeadoFinal = _mapper.Map<ProdutoDto>(resultado);
                resultadoFinal.Mensagem = $"Produto {produto} cadastrado com sucesso!";
                resultadoFinal.Usuario = produtoMapeadoFinal;
                return produtoMapeadoFinal;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> CarregarProdutoById(int produtoId)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                var resultado = await _produto.GetById(produtoId);
                if (resultado == null)
                {
                    return resultadoFinal.Mensagem = $"ID {produtoId} não encontrado!";
                }
                var produtoMapeado = _mapper.Map<ProdutoDto>(resultado);
                return resultadoFinal.Usuario = produtoMapeado;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<ProdutoDto>> CarregarProdutoByNome(string produtoNome)
        {
            try
            {
                var resultado = await _produto.CarregarProdutoByNome(produtoNome);
                if (resultado == null) return null;
                var produtoMapeado = _mapper.Map<IEnumerable<ProdutoDto>>(resultado);
                return produtoMapeado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<ProdutoDto>> CarregarProdutoPorCategoriaId(int categoriaId)
        {
            try
            {

                var resultado = await _produto.CarregarProdutoPorCategoriaId(categoriaId);
                var resultadoMapeado = _mapper.Map<IEnumerable<ProdutoDto>>(resultado);
                return resultadoMapeado;


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<int> ContarProdutosPorCategoria(int categoriaId)
        {
            try
            {
                var resultado = await _produto.ContarProdutosPorCategoria(categoriaId);
                return resultado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> Deletar(int id)
        {

            Mensagens resultadoFinal = new Mensagens();
            var resultado = await _produto.GetById(id);
            if (resultado == null)
            {
                resultadoFinal.Mensagem = $"Não foi possivel deletar produto";
                return resultadoFinal;
            }
            else
            {
                // var deletar = _mapper.Map<Produto>(resultado);
                var delete = await _produto.Deletar(resultado.Id);
                resultadoFinal.Mensagem = $"Produto {resultado} deletado com sucesso!";
                return resultadoFinal;
            }
        }

        public async Task<IEnumerable<ProdutoDto>> GetAll(int skip = 0, int take = 5)
        {
            try
            {
                var resultado = await _produto.GetAll(skip, take);
                if (resultado == null) return null;
                var produtosMapeado = _mapper.Map<IEnumerable<ProdutoDto>>(resultado);
                return produtosMapeado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<ProdutoDto>> GetAllCategoria(int skip = 0, int take = 5)
        {
            try
            {
                var resultado = await _produto.GetAllCategoria(skip, take);
                return _mapper.Map<IEnumerable<ProdutoDto>>(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        //[NonAction]
        public void DeleteImagem(string imageName)
        {
            var imagePath = Path.Combine(_webenvironment.ContentRootPath, @"Recursos/imagens", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }

        public async Task<object> CadastrarImagemDestaque(ProdutoDtoUpdate produto)
        {
            Mensagens resultadoFinal = new Mensagens();
            var produtoSelecionado = await _produto.GetById(produto.Id);
            if (produtoSelecionado == null)
            {
                resultadoFinal.Mensagem = "Erro ao carregar produto";
                return resultadoFinal;
            }
            produtoSelecionado.ImagemDestaque = produto.ImagemDestaque;
            produtoSelecionado.DestacarImagem = true;
            if (produtoSelecionado.ImagemDestaque != produto.ImagemDestaque)
            {
                DeleteImagem(produtoSelecionado.ImagemDestaque);
            }
            resultadoFinal.Mensagem = $"Produto {produto.Descricao} atualizado com sucesso!";
            await _produto.Atualizar(produtoSelecionado);
            resultadoFinal.Usuario = produtoSelecionado;
            return resultadoFinal;
        }

        public async Task<IEnumerable<ProdutoDto>> CarregarImagensDestaque()
        {
            try
            {
                var resultado = await _produto.CarregarImagensDestaque();
                var produtoMapeado = _mapper.Map<IEnumerable<ProdutoDto>>(resultado);
                return produtoMapeado;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<int> ContarProdutos()
        {
            try
            {
                var resultado = await _produto.ContadorRegistros();
                return resultado;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }



        public async Task<object> StatusEstoque()
        {
            try
            {
                StatusEstoque retornoEstoque = new StatusEstoque();
                var resultado = await _produto.GetAll(0, 200);
                var resultadoMapeado = _mapper.Map<IEnumerable<ProdutosStatusEstoqueDto>>(resultado);

                List<StatusEstoque> lista = new List<StatusEstoque>();

                foreach (var produto in resultadoMapeado)
                {
                    if (produto.QuantidadeEstoque < 1)
                    {
                        lista.Add(new StatusEstoque(
                        retornoEstoque.Mensagem = $"{produto.Descricao.ToUpper()} estoque zerado.",
                        retornoEstoque.Situacao = produto.QuantidadeEstoque,
                        retornoEstoque.Objeto = produto));
                    }
                    else if ((produto.QuantidadeEstoque) < produto.QuantidadeMinima * 1.20)
                    {
                        lista.Add(new StatusEstoque(
                        retornoEstoque.Mensagem = $"Alerta! {produto.Descricao.ToUpper()} estoque abaixo de 20%",
                        retornoEstoque.Situacao = (produto.QuantidadeEstoque - produto.QuantidadeMinima),
                        retornoEstoque.Objeto = produto));
                    }
                    else if (((produto.QuantidadeEstoque) >= produto.QuantidadeMinima * 1.20) &&
                    ((produto.QuantidadeEstoque) < produto.QuantidadeMinima * 1.30))
                    {
                        lista.Add(new StatusEstoque(
                        retornoEstoque.Mensagem = $"Alerta! {produto.Descricao.ToUpper()} estoque abaixo de 30%",
                        retornoEstoque.Situacao = (produto.QuantidadeEstoque - produto.QuantidadeMinima),
                        retornoEstoque.Objeto = produto));
                    }
                    else
                    {
                        lista.Add(new StatusEstoque(
                        retornoEstoque.Mensagem = $"{produto.Descricao.ToUpper()} estoque com margem de segurança",
                        retornoEstoque.Situacao = (produto.QuantidadeEstoque - produto.QuantidadeMinima),
                        retornoEstoque.Objeto = produto));
                    }
                }
                return lista.OrderBy(x=> x.Situacao);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}