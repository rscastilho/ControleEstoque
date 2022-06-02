using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using estoque.domain.Dtos;
using estoque.domain.Models;

namespace estoque.crosscutting.Mapping
{
    public class DtoProfile : Profile
    {
        public DtoProfile()
        {

            CreateMap<UsuarioDto, Usuario>().ReverseMap();
            CreateMap<UsuarioDtoCreate, Usuario>().ReverseMap();
            CreateMap<UsuarioDtoCreateResult, Usuario>().ReverseMap();
            CreateMap<UsuarioDtoUpdate, Usuario>().ReverseMap();
            CreateMap<UsuarioDtoUpdateResult, Usuario>().ReverseMap();
            CreateMap<UsuarioDtoUpdateResult, UsuarioDtoUpdate>().ReverseMap();

            CreateMap<LoginDto, Usuario>().ReverseMap();
            CreateMap<PerfilDtoGetAll, Perfil>().ReverseMap();

            CreateMap<CategoriaDtoCreate, Categoria>().ReverseMap();
            CreateMap<CategoriaDtoCreateResult, Categoria>().ReverseMap();
            CreateMap<CategoriaDtoUpdate, Categoria>().ReverseMap();
            CreateMap<CategoriaDtoCreate, CategoriaDtoCreateResult>().ReverseMap();

            CreateMap<FornecedorDtoCreate, Fornecedor>().ReverseMap();
            CreateMap<FornecedorDtoUpdate, Fornecedor>().ReverseMap();
            CreateMap<FornecedorDto, Fornecedor>().ReverseMap();

            CreateMap<ProdutoDto, Produto>().ReverseMap();
            CreateMap<ProdutoDtoCreate, Produto>().ReverseMap();
            CreateMap<ProdutoDtoUpdate, Produto>().ReverseMap();
            CreateMap<ProdutoDtoItensCarrinho, Produto>().ReverseMap();
            CreateMap<ProdutosDtoItensCarrinhoGetAll, Produto>().ReverseMap();


            CreateMap<PedidoDto, Pedido>().ReverseMap();
            CreateMap<PedidoDtoCreate, Pedido>().ReverseMap();
            CreateMap<PedidoDtoGetAll, Pedido>().ReverseMap();

            CreateMap<ItensCarrinhoDto, ItensCarrinho>().ReverseMap();
            CreateMap<ItensCarrinhoDtoCreate, ItensCarrinho>().ReverseMap();
            CreateMap<ItensCarrinhoDtoGetAll, ItensCarrinho>().ReverseMap();
                





        }
    }
}