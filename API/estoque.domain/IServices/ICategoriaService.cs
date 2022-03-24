using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Models;

namespace estoque.domain.IServices
{
    public interface ICategoriaService
    {
        Task<object> Atualizar(CategoriaDtoUpdate categoria);
        Task<object> Cadastrar(CategoriaDtoCreate categoria);
        Task<object> Deletar(int id);
        Task<IEnumerable<CategoriaDtoCreateResult>> GetAll();

        Task<object> CarregarCategoriaById(int categoriaId);
        Task<CategoriaDtoCreateResult> CarregarCategoriaPorNome(string categoriaNome);

        


    }
}