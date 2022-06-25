using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.data.Context;
using estoque.domain.Interfaces;
using estoque.domain.Models;
using Microsoft.EntityFrameworkCore;

namespace estoque.data.Repository
{
    public class RepositoryGeneric<TEntity> : IRepositoryGeneric<TEntity> where TEntity : BaseModel
    {

        private readonly AppDbContext _context;

        public RepositoryGeneric(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TEntity> Atualizar(TEntity tEntity)
        {
            try
            {
                var resultado = await _context.Set<TEntity>().SingleOrDefaultAsync(x => x.Id.Equals(tEntity.Id));
                if(resultado == null) return null;

                tEntity.UpdateAt = DateTime.UtcNow;
                tEntity.CreateAt = resultado.CreateAt;
                _context.Entry(resultado).CurrentValues.SetValues(tEntity);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex) 
            {
                
                throw ex;
            }
            return tEntity;
        }

        public async Task<TEntity> Cadastrar(TEntity tEntity)
        {
            try
            {
                tEntity.CreateAt = DateTime.UtcNow;
                _context.Set<TEntity>().Add(tEntity);
                await _context.SaveChangesAsync();

            }
            catch (Exception ex)
            {
                
                throw ex;
            }
            return tEntity;
         
        }

        public async Task<int> ContadorRegistros()
        {
            try
            {
                var resultado = await _context.Set<TEntity>().Where(x => x.Deleted != true).CountAsync();
                return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<int> ContadorRegistrosById(int id)
        {
            try
            {
                var resultado = await _context.Set<TEntity>().Where(x => x.Deleted != true && x.Id == id).CountAsync();
                return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<bool> Deletar(int Id)
        {
            try
            {
                var resultado = await _context.Set<TEntity>().SingleOrDefaultAsync(x => x.Id.Equals(Id));
                if(resultado == null) return false;
                resultado.DeleteAt = DateTime.UtcNow;
                resultado.Deleted = true;
                _context.Entry(resultado).CurrentValues.SetValues(resultado);
                //_context.Set<TEntity>().Remove(resultado);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
            return true;
        }

        public async Task<IEnumerable<TEntity>> GetAll(int skip=0, int take=10)
        {
            return await _context.Set<TEntity>()
            .Where(x => x.DeleteAt == null)
            .AsNoTracking()
            .Skip(skip)
            .Take(take)
            .ToListAsync();

        }

        public async Task<TEntity> GetById(int id)
        {
            var resultado =  await _context.Set<TEntity>().SingleOrDefaultAsync(x => x.Id.Equals(id) && x.DeleteAt == null);
            if(resultado == null) return null;
            return resultado;
        }

       
    }
}