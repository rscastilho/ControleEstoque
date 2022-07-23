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
    public class CategoriaService : ICategoriaService
    {

        private readonly ICategoriaRepository _categoria;
        private readonly IMapper _mapper;

        public CategoriaService(ICategoriaRepository categoria, IMapper mapper)
        {
            _categoria = categoria;
            _mapper = mapper;
        }

        public async Task<object> Atualizar(CategoriaDtoUpdate categoria)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();

                if (categoria != null)
                {
                    var mapearCategoria = _mapper.Map<Categoria>(categoria);
                    await _categoria.Atualizar(mapearCategoria);
                    var categoriaAtualizada = _mapper.Map<CategoriaDtoCreateResult>(mapearCategoria);
                    resultadoFinal.Mensagem = $"Categoria {categoriaAtualizada.Descricao} atualizada com sucesso!";
                    resultadoFinal.Usuario = categoriaAtualizada;
                }
                else
                {
                    resultadoFinal.Mensagem = $"Erro ao atualizar categoria {categoria.Descricao}";
                }
                return resultadoFinal;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> Cadastrar(CategoriaDtoCreate categoria)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();

                if (categoria != null)
                {
                    var verifica = await _categoria.VerificaCategoriaExistente(categoria.Descricao);
                    if (verifica == null)
                    {
                        var categoriaMapeada = _mapper.Map<Categoria>(categoria);
                        var resultado = await _categoria.Cadastrar(categoriaMapeada);
                        var categoriaCadastrada = _mapper.Map<CategoriaDtoCreateResult>(resultado);

                        resultadoFinal.Mensagem = $"Categoria {resultado.Descricao} cadastrada com sucesso!";
                        resultadoFinal.Usuario = categoriaCadastrada;
                    }
                    else {
                        resultadoFinal.Mensagem = $"Categoria {categoria.Descricao} já cadastrada";
                        return resultadoFinal;
                    }
                    return resultadoFinal;
                }
                else
                {
                   resultadoFinal.Mensagem = "Campo categoria vazio. Tente novamente";
                }
                 return resultadoFinal;
               


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<object> CarregarCategoriaById(int categoriaId)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                var resultado = await _categoria.GetById(categoriaId);
                if (resultado == null) return resultadoFinal.Mensagem = $"id {categoriaId} não encontrado";
                var categoriaMapeada = _mapper.Map<CategoriaDtoCreateResult>(resultado);
                resultadoFinal.Usuario = categoriaMapeada;
                return resultadoFinal;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<CategoriaDtoCreateResult>> CarregarCategoriaPorNome(string categoriaNome)
        {
            try
            {
                var resultado = await _categoria.CarregarCategoriaPorNome(categoriaNome);
                var categoriaFinal = _mapper.Map<IEnumerable<CategoriaDtoCreateResult>>(resultado);
                return categoriaFinal;
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
                var resultado = await _categoria.GetById(id);
                if (resultado != null)
                {
                    await _categoria.Deletar(resultado.Id);
                    resultadoFinal.Mensagem = $"Categoria {resultado.Descricao} excluída com sucesso!";
                }
                else
                {
                    resultadoFinal.Mensagem = $"Erro ao excluir Categoria {resultado.Descricao}";
                }
                return resultadoFinal;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<CategoriaDtoCreateResult>> GetAll(int skip =0, int take = 10)
        {
            try
            {
                var resultado = await _categoria.GetAll(skip, take);
                var categoriaFinal = _mapper.Map<IEnumerable<CategoriaDtoCreateResult>>(resultado);
                return categoriaFinal;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
    }
}