using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using estoque.domain.Dtos;
using estoque.domain.Enums;
using estoque.domain.Interfaces;
using estoque.domain.IServices;
using estoque.domain.Models;
using estoque.service.Validations;

namespace estoque.service.Services
{
    public class UsuarioService : IUsuarioService
    {

        private readonly IUsuarioRepository _usuario;
        private readonly IPerfilRepository _perfil;
        private readonly IMapper _mapper;

        public UsuarioService(IUsuarioRepository usuario, IMapper mapper, IPerfilRepository perfil)
        {
            _usuario = usuario;
            _mapper = mapper;
            _perfil = perfil;
        }

        public async Task<object> Atualizar(UsuarioDtoUpdate tEntity)
        {
            try
            {
                //pegar os dados do formulario e converte em usuario.model (completo)
                var resultado = _mapper.Map<Usuario>(tEntity);
                if (resultado == null) return null;
                //quando o usuario estiver bloqueado converte o campo para null para nao bloquear no login
                if (resultado.Blocked != null)
                {
                    if (tEntity.Blocked == false)
                    {
                        resultado.Blocked = null;
                    }
                }
                //salva a mesma senha o campo senha. estava carregando em branco quando o usuario estava sendo alterado para desbloqueio da senha
                var senha = await _usuario.PegarSenhaPorId(tEntity.Id);
                resultado.Senha = senha;
                //salva a mesma dataexpiracao o campo dataexpiracao. estava carregando em branco quando o usuario estava sendo alterado para desbloqueio da senha
                var dataExpira = await _usuario.PegarDataExpiraId(tEntity.Id);
                resultado.PasswordExpirationDate = DateTime.Parse(dataExpira);

                Mensagens resultadoFinal = new Mensagens();
                if (resultado.Senha == null) return null;

                var final = await _usuario.Atualizar(resultado);
                var usuarioFinal = _mapper.Map<UsuarioDtoUpdateResult>(final);
                resultadoFinal.Mensagem = $"Usuario {final.Nome} atualizado com sucesso!";
                return resultadoFinal;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<object> Cadastrar(UsuarioDtoCreate tEntity)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();

                if (await _usuario.VerificaCPF(tEntity.CPF) != false && await _usuario.VerificaEmail(tEntity.Email) != false)
                {
                    resultadoFinal.Mensagem = $"Email {tEntity.Email} e CPF {tEntity.CPF} existentes";

                }
                else if
             (await _usuario.VerificaCPF(tEntity.CPF) != false)
                {
                    resultadoFinal.Mensagem = $"CPF {tEntity.CPF} cadastrado";
                }
                else if
              (await _usuario.VerificaEmail(tEntity.Email) != false)
                {
                    resultadoFinal.Mensagem = $"Email {tEntity.Email} cadastrado";
                }

                else
                {

                    if (Validations.ValidaCPF.validacaoCpf(tEntity.CPF) == true)
                    {

                        var entity = _mapper.Map<Usuario>(tEntity);
                        var perfil = new Perfil();
                        
                        entity.ErroSenha = 0;
                        entity.PasswordExpirationDate = DateTime.Now.AddDays(30);
                        var resultado = await _usuario.Cadastrar(entity);
                        

                        if (await _perfil.VerificaPerfilCadastrado() == true)
                        {
                            perfil.UsuarioId = resultado.Id;
                            perfil.Funcoes = Funcoes.Visitante;
                            if (resultado != null) await _perfil.CadastrarPerfil(perfil);
                        }
                        else if(entity.CPF.Trim().Length > 11)
                        {
                            perfil.UsuarioId = resultado.Id;
                            perfil.Funcoes = Funcoes.Fornecedor;
                            if (resultado != null) await _perfil.CadastrarPerfil(perfil);
                        }
                        else
                        {
                            perfil.UsuarioId = resultado.Id;
                            perfil.Funcoes = Funcoes.Administrador;
                            if (resultado != null) await _perfil.CadastrarPerfil(perfil);
                        }

                        if (resultado == null) return null;
                        var usuarioCadastrado = _mapper.Map<UsuarioDtoCreateResult>(resultado);

                        resultadoFinal.Mensagem = "Usuario cadastrado com sucesso!";
                        resultadoFinal.Usuario = usuarioCadastrado;
                        return resultadoFinal;

                    }
                    else
                    {
                        resultadoFinal.Mensagem = "CPF em formato invalido";
                        return resultadoFinal;
                    }
                }
                return resultadoFinal;


            }
            catch (Exception ex)
            {

                throw ex;

            }
        }

        public async Task<IEnumerable<UsuarioDto>> CarregarUsuarioPorNome(string nome)
        {
            try
            {
                var resultado = await _usuario.CarregarUsuarioPorNome(nome);
                var usuarioMapeado = _mapper.Map<IEnumerable<UsuarioDto>>(resultado);
                return usuarioMapeado;
            }
            catch (Exception ex)
            {
                
                throw ex; 
            }
        }

        public async Task<object> Deletar(int Id)
        {
            try
            {
                Mensagens resultadoFinal = new Mensagens();
                var verificaAdm = await _perfil.CarregarPerfilPorId(Id);
                if (verificaAdm.Funcoes == 0)
                {
                    resultadoFinal.Mensagem = "Não é possivel excluir o administrador do sistema";
                    return resultadoFinal;
                }
                else
                {

                    var resultado = await _usuario.Deletar(verificaAdm.UsuarioId);
                    if (resultado == false)
                    {
                        resultadoFinal.Mensagem = "Usuario não encontrado!";
                        return resultadoFinal;
                    }
                    resultadoFinal.Mensagem = "Usuário deletado com sucesso!";
                    return resultadoFinal;
                }


            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<IEnumerable<UsuarioDto>> GetAll()
        {
            try
            {
                var resultado = await _usuario.GetAll();
                if (resultado == null) return null;
                var listarTodos = _mapper.Map<IEnumerable<UsuarioDto>>(resultado);
                return listarTodos;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public async Task<UsuarioDto> GetByEmail(string email)
        {
            try
            {

                var resultado = await _usuario.GetByEmail(email);
                if (resultado == null) return null;
                var usuarioDto = _mapper.Map<UsuarioDto>(resultado);
                return usuarioDto;

            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        public async Task<UsuarioDto> GetById(int id)
        {
            try
            {
                var resultado = await _usuario.GetById(id);
                if (resultado == null) return null;
                var usuarioId = _mapper.Map<UsuarioDto>(resultado);
                return usuarioId;

            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}