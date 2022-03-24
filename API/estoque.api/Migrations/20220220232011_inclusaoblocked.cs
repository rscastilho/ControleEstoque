using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace estoque.api.Migrations
{
    public partial class inclusaoblocked : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BlockeAt",
                table: "Usuarios",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "Blocked",
                table: "Usuarios",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BlockeAt",
                table: "Usuarios");

            migrationBuilder.DropColumn(
                name: "Blocked",
                table: "Usuarios");
        }
    }
}
