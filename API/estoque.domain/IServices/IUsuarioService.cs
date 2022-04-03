using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Interfaces;
using estoque.domain.Models;

namespace estoque.domain.IServices
{
    public interface IUsuarioService
    {

        Task<object> Atualizar(UsuarioDtoUpdate tEntity);
        Task<object> Cadastrar(UsuarioDtoCreate tEntity);
        Task<object> Deletar(int Id);
        Task<IEnumerable<UsuarioDto>> GetAll(int skip =0, int take = 5);

        Task<IEnumerable<UsuarioDto>> CarregarUsuarioPorNome(string nome);

        Task<UsuarioDto> GetByEmail(string email);
        
        Task<UsuarioDto> GetById(int id);


        
        

    }
}