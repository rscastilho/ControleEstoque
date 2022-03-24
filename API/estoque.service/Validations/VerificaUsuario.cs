using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using estoque.domain.IServices;
using estoque.domain.Models;

namespace estoque.service.Validations
{
    public class VerificaUsuario
    {
        private readonly IUsuarioService _usuario;
        private readonly IMapper _mapper;

        public VerificaUsuario(IUsuarioService usuario, IMapper mapper)
        {
            _usuario = usuario;
            _mapper = mapper;
        }
        public bool UsaurioBloqueado(string email)
        {

            var resultado = _usuario.GetByEmail(email);
            var usuario = _mapper.Map<Usuario>(resultado);
            if (usuario.Deleted == true)
            {
                return true;
            }
            else
            {
                return true;
            }


        }

    }
}