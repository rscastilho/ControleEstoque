using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.IServices;
using estoque.domain.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace estoque.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PerfisController : ControllerBase
    {
        private readonly IPerfilService _perfil;

        public PerfisController(IPerfilService perfil)
        {
            _perfil = perfil;
        }



        [Authorize (Roles ="Administrador")]
        [HttpGet]
        public async Task<IActionResult> GetAllPerfis(){
            var resultado = await _perfil.ListarTodosPerfis();
            return Ok(resultado);

        }

        [Authorize (Roles ="Administrador")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPerfilById(int id){
            if(!ModelState.IsValid) return BadRequest("Erro ao carregar perfil");
            try
            {
                var resultado = await _perfil.CarregarPerfilPorId(id);
                if(resultado==null) return BadRequest ("Usuario não encontrado");
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [Authorize (Roles ="Administrador")]
        [HttpPut]
        public async Task<IActionResult> AtualizarPerfil(PerfilDtoGetAll perfil){

            
            var resultado = await _perfil.AtualizarPerfil(perfil);
            return Ok(resultado);
            
            
        }
    }
}