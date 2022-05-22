using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace estoque.api.Controllers
{
    [Authorize (Roles ="Administrador")]
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriasController : ControllerBase
    {
        private readonly ICategoriaService _categoria;

        public CategoriasController(ICategoriaService categoria)
        {
            _categoria = categoria;
        }

        [HttpGet]
        public async Task<IActionResult>GetAllCategorias(int skip =0,  int take=10){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _categoria.GetAll(skip, take);
                return Ok (resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet("{nomeCategoria}")]
        public async Task<IActionResult>CategoriaByNomeCategoria(string nomeCategoria){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _categoria.CarregarCategoriaPorNome(nomeCategoria);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet ("pesquisarporid/{categoriaId}")]
        public async Task<IActionResult> CategoriaById(int categoriaId){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _categoria.CarregarCategoriaById(categoriaId);
                
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet("contarcategoria/categoriaNome")]
        public async Task<IActionResult>ContarCategorias(string categoriaNome){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _categoria.ContarCategorias(categoriaNome);
                return Ok(resultado);
            }   
            catch (Exception ex)
            {
                
                throw ex;
            }
        }


        [HttpPost]
        public async Task<IActionResult> PostCategoria(CategoriaDtoCreate categoria){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _categoria.Cadastrar(categoria);
                return Ok (resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
            
        }

        [HttpPut]
        public async Task<IActionResult> PutCategoria(CategoriaDtoUpdate categoria){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _categoria.Atualizar(categoria);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategoria(int id){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _categoria.Deletar(id);
                return Ok(resultado);
                
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }


    }
}