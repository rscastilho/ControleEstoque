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
    public class FornecedorService: IFornecedorService
    {
        private readonly IFornecedorRepository _fornecedor;
        private readonly IMapper _mapper;

        public FornecedorService(IFornecedorRepository fornecedor, IMapper mapper)
        {
            _fornecedor = fornecedor;
            _mapper = mapper;
        }

        public async Task<object> Atualizar(FornecedorDtoUpdate fornecedor)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                if(fornecedor != null){
                    var fornecedorMapeado = _mapper.Map<Fornecedor>(fornecedor);
                    var verificaFornecedor = await _fornecedor.GetById(fornecedor.Id);
                    if(verificaFornecedor != null){
                        var atualiza = await _fornecedor.Atualizar(fornecedorMapeado);
                        resultadoFinal.Mensagem = $"Fornecedor {fornecedor.RazaoSocial} atualizado com sucesso!";
                        resultadoFinal.Usuario = _mapper.Map<FornecedorDto>(atualiza);
                        return resultadoFinal;
                    }
                    else{
                        
                            resultadoFinal.Mensagem = $"Fornecedor {fornecedor.RazaoSocial} não encontrado";
                            return resultadoFinal;
                        }
                    
                }
                else{
                    resultadoFinal.Mensagem = "Fornecedor não informado!";
                    return resultadoFinal;
                }
                
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<object> Cadastrar(FornecedorDtoCreate fornecedor)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                if(fornecedor != null){
                    var fornecedorMapeado = _mapper.Map<Fornecedor>(fornecedor);
                    var verificaFornecedor = await _fornecedor.CarregarFornecedorPorNome(fornecedor.RazaoSocial);
                    if(verificaFornecedor != null){
                        resultadoFinal.Mensagem = $"Fornecedor {fornecedor.RazaoSocial} já cadastrado";
                        return resultadoFinal;
                    }
                    else{
                        var resultado = await _fornecedor.Cadastrar(fornecedorMapeado);
                        if(resultado != null){
                            resultadoFinal.Mensagem = $"Fornecedor {fornecedor.RazaoSocial} cadastrado com sucesso!";
                            resultadoFinal.Usuario = _mapper.Map<FornecedorDto>(resultado);
                            return resultadoFinal;
                        }
                        resultadoFinal.Mensagem = $"Erro ao tentar cadastrar {fornecedor.RazaoSocial} ";
                    }

                }
                else{
                    resultadoFinal.Mensagem = "Fornecedor não informado!";
                    return resultadoFinal;
                }
                return resultadoFinal;

            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<object> CarregarFornecedorById(int fornecedorId)
        {
            try
            {
                var resultado = await _fornecedor.GetById(fornecedorId);
                return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<object> CarregarFornecedorPorCNPJ(string cnpj)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                var resultado = await _fornecedor.CarregarFornecedorPorCNPJ(cnpj.ToString());
                if(resultado == null){
                resultadoFinal.Mensagem = $"Fornecedor com {cnpj} não encontrado!";
                return resultadoFinal;
                }
                var fornecedorMapeado = _mapper.Map<FornecedorDto>(resultado);
                resultadoFinal.Usuario = fornecedorMapeado;
                return resultadoFinal;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<object> CarregarFornecedorPorNome(string fornecedorNome)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                var resultado = await _fornecedor.CarregarFornecedorPorNome(fornecedorNome);
                if(resultado == null){
                    resultadoFinal.Mensagem = $"Fornecedor {fornecedorNome} não encontrado!";
                    return resultadoFinal;
                }
                
                var fornecedorMapeado = _mapper.Map<FornecedorDto>(resultado);
                resultadoFinal.Usuario = fornecedorMapeado;
                return resultadoFinal;
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
                var resultado = await _fornecedor.GetById(id);
                if(resultado != null){
                    var fornecedorMapeado = _mapper.Map<Fornecedor>(resultado);
                    var deletar = await _fornecedor.Deletar(fornecedorMapeado.Id);
                    resultadoFinal.Mensagem = $"fornecedor {fornecedorMapeado.RazaoSocial} deletado com sucesso!";

                }
                else {
                    resultadoFinal.Mensagem = $" Não foi possivel deletar fornecedor";
                    return resultadoFinal;
                }

                return resultadoFinal;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<IEnumerable<FornecedorDto>> GetAll()
        {
            try
            {
                var resultado = await _fornecedor.GetAll();
                var fornecedorMapeado = _mapper.Map<IEnumerable<FornecedorDto>>(resultado);
                return fornecedorMapeado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }
}