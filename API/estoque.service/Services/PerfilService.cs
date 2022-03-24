using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using estoque.domain.Dtos;
using estoque.domain.Enums;
using estoque.domain.Interfaces;
using estoque.domain.IServices;
using estoque.domain.Models;

namespace estoque.service.Services
{
    public class PerfilService : IPerfilService

    {

        private readonly IPerfilRepository _perfil;
        private readonly IMapper _mapper;

        public PerfilService(IPerfilRepository perfil, IMapper mapper)
        {
            _perfil = perfil;
            _mapper = mapper;
        }

        public async Task<object> AtualizarPerfil(PerfilDtoGetAll perfil)
        {
            Mensagens resultadoFinal = new Mensagens();
            
            if(perfil == null) return null;
            var perfilFinal = _mapper.Map<Perfil>(perfil);

            await _perfil.AtualizarPerfil(perfilFinal);

            var perfilExibir = _mapper.Map<PerfilDtoGetAll>(perfilFinal);
            resultadoFinal.Mensagem = $"Perfil {perfilExibir.Funcoes} atualizado com sucesso!";
                     


            //resultadoFinal.Mensagem = $"Perfil {perfil.Usuario.Nome} atualizado com sucesso!";
            
            return resultadoFinal;
            
        }

        public async Task<object> CadastrarPerfil(Perfil perfil)
        {
            Mensagens resultadoFinal = new Mensagens();
            if(perfil == null) return null;
            

            await _perfil.CadastrarPerfil(perfil);
            resultadoFinal.Mensagem = "Perfil cadastrado com sucesso!";
            resultadoFinal.Usuario = perfil;
            return resultadoFinal;

        }

        public async Task<Perfil> CarregarPerfilPorId(int usuarioId)
        {
            try
            {
                var resultado  = await _perfil.CarregarPerfilPorId(usuarioId);
                return resultado;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        public async Task<IEnumerable<PerfilDtoGetAll>> ListarTodosPerfis()
        {
            var resultado = await _perfil.ListarTodosPerfis();
            var getTodos = _mapper.Map<IEnumerable<PerfilDtoGetAll>>(resultado);
            return getTodos;
        }

        public async Task<bool> VerificaPerfilCadastrado()
        {
            try
            {
                return await _perfil.VerificaPerfilCadastrado();

            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }
}