using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.IServices;
using estoque.domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace estoque.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PedidosController : ControllerBase
    {

        private readonly IPedidoService _pedido;

        public PedidosController(IPedidoService pedido)
        {
            _pedido = pedido;
        }

        [HttpPost]
        public async Task<IActionResult> postPedidos(PedidoDto pedido){
            if(!ModelState.IsValid) return BadRequest("Erro ao processar pedido de compra");
            try
            {
                var resultado = await _pedido.Cadastrar(pedido);
                return Ok(resultado);

            }
            catch (Exception ex)
            {
                
                throw ex;
            }

        }

        [HttpGet]
        public async Task<IActionResult> getAllPedidos(){
            if(!ModelState.IsValid) return BadRequest("Erro ao processar pedido de compra");
            try
            {
                var resultado = await _pedido.getAllPedidos();
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> getById(int id){
            if(!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _pedido.CarregarPedidoById(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
            
        }

        [HttpGet("pedidosbyuserId/{userId}")]
        public async Task<IActionResult> getByUserId(int userId, int skip=0, int take=5){
            if(!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _pedido.getPedidosByUserId(userId, skip, take);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet("contarpedidoporusuario/{userId}")]
        public async Task<IActionResult> countPedidoByUserId(int userId){
            if(!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _pedido.ContadorPedidoByUserId(userId);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [HttpGet("pedidospordata/")]
        public async Task<IActionResult> PedidosporDatas(DateTime dataInicial, DateTime dataFinal){
            try
            {
                var resultado = await _pedido.GetPedidosPorData(dataInicial, dataFinal);
                if(resultado == null) {
                    return Ok (new{ mensagem = "nada encontrado"});
                }else{

                return Ok(resultado);
                }
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

    }
}