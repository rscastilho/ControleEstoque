using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Interfaces
{
    public interface IRepositoryGeneric<TEntity> where TEntity: class
    {
    Task<IEnumerable<TEntity>> GetAll(int skip, int take);
    Task<TEntity> GetById(int id);
    Task<TEntity> Cadastrar(TEntity tEntity);
    Task<TEntity> Atualizar(TEntity tEntity);
    Task<bool> Deletar (int Id);
    Task<int> ContadorRegistros();

    }
    
}