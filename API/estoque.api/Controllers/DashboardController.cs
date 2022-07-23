using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.IServices;
using Microsoft.AspNetCore.Mvc;

namespace estoque.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DashboardController : ControllerBase

    {

        private readonly IDashboardService _dashboard;

        public DashboardController(IDashboardService dashboard)
        {
            _dashboard = dashboard;
        }

        [HttpGet]
        public async Task<IActionResult> ContarCategorias()
        {
            try
            {
                var resultado = await _dashboard.Contador();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        




    }
}