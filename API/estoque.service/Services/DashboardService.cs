using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Interfaces;
using estoque.domain.IServices;

namespace estoque.service.Services
{





    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboard;

        public DashboardService(IDashboardRepository dashboard)
        {
            _dashboard = dashboard;
        }

        public async Task<object> Contador()
        {
            try
            {
                var resultado = await _dashboard.Contador();
                return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<object> ValoresPedidos()
        {
            try
            {
                var resultado = await _dashboard.ValoresPedidos();
                return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }
}