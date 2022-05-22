using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.IServices;
using Microsoft.AspNetCore.Mvc;

namespace estoque.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FornecedoresController : ControllerBase
    {
        private readonly IFornecedorService _fornecedor;

        public FornecedoresController(IFornecedorService fornecedor)
        {
            _fornecedor = fornecedor;
        }

        [HttpGet]
        public async Task<IActionResult>GetAllFornecedores(int skip=0, int take = 5){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _fornecedor.GetAll(skip, take);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFornecedorById(int id){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _fornecedor.CarregarFornecedorById(id);
                return Ok (resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet("pesquisarcnpj/{cnpj}")]
        public async Task<IActionResult> GetFornecedorByCnpj(string cnpj){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _fornecedor.CarregarFornecedorPorCNPJ(cnpj);
                return Ok (resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet("pesquisarnome/{nome}")]
        public async Task<IActionResult> GetFornecedorByNome(string nome){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _fornecedor.CarregarFornecedorPorNome(nome);
                return Ok (resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet("contador")]
        public async Task<IActionResult> ContadorFornecedor(){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _fornecedor.ContarFornecedores();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }



        [HttpPost]
        public async Task<IActionResult> PostFornecedor(FornecedorDtoCreate fornecedor){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _fornecedor.Cadastrar(fornecedor);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpPut]
        public async Task<IActionResult> PutFornecedor(FornecedorDtoUpdate fornecedor){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _fornecedor.Atualizar(fornecedor);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFornecedor(int id){
            if(!ModelState.IsValid) return BadRequest ("Erro ao processar informações");
            try
            {
                var resultado = await _fornecedor.Deletar(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        
    }
}