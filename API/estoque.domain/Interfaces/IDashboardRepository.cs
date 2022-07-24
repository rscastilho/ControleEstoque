using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace estoque.domain.Interfaces
{
    public interface IDashboardRepository
    {
        Task<Object> Contador();
        Task<Object> ValoresPedidos();
               

    }
}