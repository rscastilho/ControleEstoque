using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace estoque.service.Validations
{
    public class Imagens
    {
        private readonly IWebHostEnvironment _webenvironment;

        public Imagens(IWebHostEnvironment webenvironment)
        {
            _webenvironment = webenvironment;
        }

        public string SaveImage(IFormFile imageFile){
            try
            {
                string imageName = new string(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(" ", "-");
                imageName = $"{imageName}{DateTime.UtcNow.ToString("yymmssfff")}{Path.GetExtension(imageFile.FileName)}";

                var imagePath = Path.Combine(_webenvironment.ContentRootPath,@"recursos/imagens",imageName);
                using (var fileStream = new FileStream(imagePath, FileMode.Create)){
                    imageFile.CopyToAsync(fileStream);
                }
                return imageName;
            }
            catch (Exception ex)
            {
                
                throw ex;
            }
        }
    }
}