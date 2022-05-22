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
        Task<IEnumerable<CategoriaDtoCreateResult>> GetAll(int skip =0, int take = 5);

        Task<object> CarregarCategoriaById(int categoriaId);
        Task<IEnumerable<CategoriaDtoCreateResult>> CarregarCategoriaPorNome(string categoriaNome);
        Task<int> ContarCategorias(string categoriaNome);

        


    }
}