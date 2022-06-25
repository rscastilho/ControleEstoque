using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using estoque.domain.Dtos;
using estoque.domain.Enums;
using estoque.domain.Interfaces;
using estoque.domain.IServices;
using estoque.domain.Models;
using estoque.domain.Security;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace estoque.service.Services
{
    public class LoginService : ILoginService
    {

        private readonly IUsuarioRepository _usuario;
        private readonly IPerfilRepository _perfil;
        private readonly AppSettings _appsettings;
        private readonly IMapper _mapper;

        public LoginService(IUsuarioRepository usuario, IOptions<AppSettings> appsettings, IMapper mapper, IPerfilRepository perfil)
        {
            _usuario = usuario;
            _appsettings = appsettings.Value;
            _mapper = mapper;
            _perfil = perfil;
        }

        public async Task<object> UsuarioPorEmail(LoginDto usuario)
        {

            var resultado = await _usuario.GetByEmail(usuario.Email);

            return resultado;

        }

 public async Task<string> GerarJwt(string email)
        {

            var resultado = await _usuario.GetByEmail(email);
            var perfilMapper = _mapper.Map<Usuario>(resultado);
            var perfil = await _perfil.CarregarPerfilPorId(perfilMapper.Id);
            

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appsettings.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]{
                    new Claim(ClaimTypes.Email, email.ToString()),
                   new Claim(ClaimTypes.Role, perfil.Funcoes.ToString())
                }),

                Issuer = _appsettings.Emissor,
                Audience = _appsettings.ValidoEm,
                Expires = DateTime.UtcNow.AddHours(_appsettings.ExpiracaoHoras),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)

            };
            return tokenHandler.WriteToken(tokenHandler.CreateToken(tokenDescriptor));



        }
   


        public async Task<UsuarioDtoCreateResult> Logar(LoginDto login)
        {
            var resultado = await _usuario.GetByEmail(login.Email);
            

            if (resultado == null)
            {
                return null;
            }
            else
            {
                var usuario = _mapper.Map<Usuario>(resultado);
                if (usuario.Blocked == null || usuario.PasswordExpirationDate > DateTime.Now)
                {
                    if (usuario.Senha.Equals(login.Senha))
                    {// && usuario.Blocked==null && usuario.PasswordExpirationDate > DateTime.Now) {
                        usuario.ErroSenha = 0;
                        usuario.BlockeAt = null;
                        usuario.Blocked = null;
                        usuario.UltimoAcesso = DateTime.Now;

                        await _usuario.Atualizar(usuario);
                        var userFinal = _mapper.Map<UsuarioDtoCreateResult>(usuario);
                        return userFinal;
                    }
                    else if (usuario.ErroSenha >= 5)
                    {
                        usuario.Blocked = true;
                        usuario.BlockeAt = DateTime.Now;
                        await _usuario.Atualizar(usuario);
                        throw new Exception("Usuario bloqueado devido a varios erros de senha");
                    }
                    else
                    {
                        usuario.ErroSenha++;
                        await _usuario.Atualizar(usuario);
                        return null;
                    }
                }
                else
                {
                    usuario.Blocked = true;
                    usuario.BlockeAt = DateTime.Now;
                    await _usuario.Atualizar(usuario);
                    throw new Exception("Usuario Bloqueado");
                }
            }
        }

        public async Task<object> Logando(LoginDto login)
        {
            Mensagens resultadoFinal = new Mensagens();

            var resultado = await _usuario.GetByEmail(login.Email);
             if (resultado == null)
            {
                resultadoFinal.Mensagem = "Usuário não cadastrado";
                return resultadoFinal;
            }
            else
            {
                var usuario = _mapper.Map<Usuario>(resultado);
                if (usuario.Blocked == null && usuario.PasswordExpirationDate > DateTime.Now && usuario.Deleted != true)
                {
                    if (usuario.Senha.Equals(login.Senha))
                    {
                        usuario.ErroSenha = 0;
                        usuario.BlockeAt = null;
                        usuario.Blocked = null;
                        usuario.UltimoAcesso = DateTime.Now;
                        var perfil = await _perfil.CarregarPerfilPorId(usuario.Id);
                        await _usuario.Atualizar(usuario);
                        var userFinal = _mapper.Map<UsuarioDtoCreateResult>(usuario);
                        var token = GerarJwt(login.Email);

                        resultadoFinal.Mensagem = $"Seja bem vindo {usuario.Nome.ToUpper()}. Login realizado com sucesso!";
                        resultadoFinal.TokenUsuario = token;
                        resultadoFinal.Usuario = userFinal;
                    }
                    else if (usuario.ErroSenha >= 5)
                    {
                         usuario.Blocked = true;
                        usuario.BlockeAt = DateTime.Now;
                        await _usuario.Atualizar(usuario);
                        resultadoFinal.Mensagem = ("Usuario bloqueado apos varias tentativas sem exito");
                        
                    }
                    else
                    {
                         usuario.ErroSenha++;
                        await _usuario.Atualizar(usuario);
                        resultadoFinal.Mensagem = ("Senha incorreta");
                        resultadoFinal.TokenUsuario = false;
                    }
                }
                else
                {
                     usuario.Blocked = true;
                    usuario.BlockeAt = DateTime.Now;
                    await _usuario.Atualizar(usuario);
                    resultadoFinal.Mensagem = ("Usuario bloqueado!");
                    resultadoFinal.TokenUsuario = false;
                }
            }
            return resultadoFinal;



        }
    }
}