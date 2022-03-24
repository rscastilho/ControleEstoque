using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using estoque.domain.Models;
using Microsoft.EntityFrameworkCore;

namespace estoque.data.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Perfil> Perfis { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Fornecedor> Fornecedores { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder){

            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>().ToTable("Usuarios");
            modelBuilder.Entity<Usuario>().HasKey(x => x.Id);
            modelBuilder.Entity<Usuario>().HasIndex(x => x.Email).IsUnique();
            modelBuilder.Entity<Usuario>().HasIndex(x => x.CPF).IsUnique();

            modelBuilder.Entity<Categoria>().ToTable("Categorias");
            modelBuilder.Entity<Categoria>().HasKey(x => x.Id);
            modelBuilder.Entity<Categoria>().HasIndex(x => x.Descricao).IsUnique();
            modelBuilder.Entity<Categoria>().HasMany(x => x.Produtos).WithOne(x => x.Categoria);

            modelBuilder.Entity<Produto>().ToTable("Produtos");
            modelBuilder.Entity<Produto>().HasKey(x => x.Id);
            modelBuilder.Entity<Produto>().HasIndex(x => x.Descricao);
            modelBuilder.Entity<Produto>().HasOne(x => x.Fornecedor);
            modelBuilder.Entity<Produto>().HasOne(x => x.Categoria);
            
            modelBuilder.Entity<Fornecedor>().ToTable("Fornecedores");
            modelBuilder.Entity<Fornecedor>().HasKey(x => x.Id);
            modelBuilder.Entity<Fornecedor>().HasIndex(x => x.CNPJ).IsUnique();
            modelBuilder.Entity<Fornecedor>().HasMany(x => x.Produtos).WithOne(x => x.Fornecedor);
                      
        }


    }



}