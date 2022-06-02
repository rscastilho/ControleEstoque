using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Models;

namespace estoque.domain.IServices
{
    public interface IFornecedorService
    {
    Task<object> Atualizar(FornecedorDtoUpdate fornecedor);
    Task<object> Cadastrar(FornecedorDtoCreate fornecedor);
    Task<object> Deletar(int id);
    Task<object> CarregarFornecedorById(int fornecedorId);
    Task<IEnumerable<FornecedorDto>> GetAll(int skip =0, int take = 5);
    Task<object> CarregarFornecedorPorNome(string fornecedorNome);
    
    Task<IEnumerable<Fornecedor>> ListarFornecedoresPorNome(string forncedorNome);
    Task<object> CarregarFornecedorPorCNPJ(string cnpj);
    Task<int> ContarFornecedores();
    }
}