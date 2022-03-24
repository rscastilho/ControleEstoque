using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.Enums;
using estoque.domain.IServices;
using estoque.domain.Models;
using estoque.domain.Security;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace estoque.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private readonly IUsuarioService _usuario;
        private readonly ILoginService _login;
        private readonly AppSettings _appsettings;

        public UsuariosController(IUsuarioService usuario, IOptions<AppSettings> appsettings, ILoginService login)
        {
            _usuario = usuario;
            _appsettings = appsettings.Value;
            _login = login;
        }

        [Authorize (Roles ="Administrador")]
        [HttpGet ]
        public async Task<IActionResult> GetAll()
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações!");
            try
            {
                var resultado = await _usuario.GetAll();

                if (resultado == null) return BadRequest("Usuarios não encontrados");
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUsuarioById(int id)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações!");
            try
            {
                var resultado = await _usuario.GetById(id);
                if (resultado == null) return BadRequest("Id não existe");
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


        [AllowAnonymous]
        [HttpPost("Registrar")]
        public async Task<IActionResult> PostUsuario(UsuarioDtoCreate usuario)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações!");
            try
            {
                if (usuario == null) return BadRequest();
                var resultado = await _usuario.Cadastrar(usuario);
                if (resultado == null) return BadRequest("Erro ao cadastrar. Verifique os dados informados");
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [Authorize]
        [HttpPut]
        public async Task<IActionResult> PutUsuario(UsuarioDtoUpdate usuario)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações!");
            try
            {
                if (usuario == null) return BadRequest("Erro ao tentar atualizar usuario!");
                var resultado = await _usuario.Atualizar(usuario);
                return Ok(new
                {
                    resultado,
                    mensagem = $"Usuario {usuario.Nome} atualizado com sucesso!"
                });
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        [Authorize (Roles ="Administrador")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações!");
            try
            {
                //var resultado = await _usuario.GetById(id);
                //if (resultado == null) return BadRequest($"Usuario Id: {id} não encontrado!");
                var resultado = await _usuario.Deletar(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto login)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações!");
            try
            {
                var resultado = await _login.Logando(login);
                {
                    return Ok(resultado);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("carregarusuariopornome/{nome}")]
        public async Task<IActionResult> carregarUsuarioPorNome(string nome){
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações!");
            try
            {
                var resultado = await _usuario.CarregarUsuarioPorNome(nome);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }


        }

        

    }
}