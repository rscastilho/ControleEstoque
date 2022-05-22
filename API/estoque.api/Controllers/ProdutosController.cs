using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Dtos;
using estoque.domain.IServices;
using estoque.service.Validations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace estoque.api.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class ProdutosController : ControllerBase
    {
        private readonly IProdutoService _produtos;
        private readonly IWebHostEnvironment _webenvironment;

        public ProdutosController(IProdutoService produtos, IWebHostEnvironment webenvironment)
        {
            _produtos = produtos;
            _webenvironment = webenvironment;
        }


        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAllProdutos(int skip =0, int take = 5)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.GetAllCategoria(skip, take);
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpGet("contador")]
        [Authorize]
        public async Task<IActionResult> ContadorProdutos(){
        if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
        try
        {
            var resultado = await _produtos.ContarProdutos();
            return Ok(resultado);
        }
        catch (Exception ex)
        {
            
            throw ex;
        }            
        }

        [Authorize]
        [HttpGet("pesquisarporid/{id}")]

        public async Task<IActionResult> GetProdutoById(int id)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.CarregarProdutoById(id);
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        [Authorize]
        [HttpGet("pesquisarpornome/{produtoNome}")]
        public async Task<IActionResult> PesquisarProdutoPorNome(string produtoNome)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.CarregarProdutoByNome(produtoNome);
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpGet("imagemdestaque")]
        public async Task<IActionResult> CarregarImagensDestaque(){
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.CarregarImagensDestaque();
                if (resultado == null) return BadRequest("Não existem imagens em destaque");
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [Authorize]
        [HttpGet("contarcategoria/{categoriaId}")]
        public async Task<IActionResult> ContarProdutosPorCategoria(int categoriaId)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.ContarProdutosPorCategoria(categoriaId);
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }

        [Authorize]
        [HttpGet("produtosporcategoria/{categoriaId}")]
        public async Task<IActionResult> ProdutoPorCategoriaId(int categoriaId)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            {
                try
                {
                    var resultado = await _produtos.CarregarProdutoPorCategoriaId(categoriaId);
                    return Ok(resultado);
                }
                catch (Exception ex)
                {

                    throw ex;
                }
            }

        }

        //[Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<IActionResult> PostProduto(ProdutoDtoCreate produto)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.Cadastrar(produto);
                //await SalvarImagem();
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }

        }


        [HttpPost("salvarimagem")]
        //[NonAction]
        public async Task<IActionResult> SalvarImagem()
        {
            var file = Request.Form.Files[0];
            if (file.Length > 0)
            {
                    var imageName = file.FileName.ToLower().ToString();
                    if (imageName.Contains("uploadImage") || imageName == "uploadImage.jpg"){
                    DeleteImagem(imageName);
                    } 
                    
                    await SaveImage(file);

                }
            

            return Ok(file.FileName);

        }


        [Authorize(Roles = "Administrador")]
        [HttpPut]
        public async Task<IActionResult> PutProduto(ProdutoDtoUpdate produto)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.Atualizar(produto);

               return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [HttpPut("imagemdestaque")]
        public async Task<IActionResult> ImagemDestaque(ProdutoDtoUpdate produto){
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.CadastrarImagemDestaque(produto);
                return Ok(resultado);

                
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }

        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduto(int id)
        {
            if (!ModelState.IsValid) return BadRequest("Erro ao processar informações");
            try
            {
                var resultado = await _produtos.Deletar(id);
                
                return Ok(resultado);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {
            try
            {
                //string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                //imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

                var imagePath = Path.Combine(_webenvironment.ContentRootPath, @"recursos/imagens", imageFile.FileName);
                using (var fileStream = new FileStream(imagePath, FileMode.Create))
                {
                    await imageFile.CopyToAsync(fileStream);
                }
                return imagePath;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        [NonAction]
        public void DeleteImagem(string imageName)
        {
            var imagePath = Path.Combine(_webenvironment.ContentRootPath, @"Recursos/imagens/", imageName);
            if (System.IO.File.Exists(imagePath))
            {
                System.IO.File.Delete(imagePath);
            }
        }


    }
}