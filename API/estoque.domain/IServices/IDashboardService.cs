using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.IServices
{
    public interface IDashboardService
    {
        Task<Object> Contador();
        Task<Object> ValoresPedidos();

        
    }
}