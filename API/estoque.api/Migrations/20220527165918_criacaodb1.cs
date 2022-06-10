using Microsoft.EntityFrameworkCore.Migrations;

namespace estoque.api.Migrations
{
    public partial class criacaodb1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ItensCarrinhoId",
                table: "Pedidos",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ItensCarrinhoId",
                table: "Pedidos");
        }
    }
}
