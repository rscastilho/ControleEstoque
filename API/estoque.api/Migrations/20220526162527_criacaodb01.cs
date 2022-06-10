using Microsoft.EntityFrameworkCore.Migrations;

namespace estoque.api.Migrations
{
    public partial class criacaodb01 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProdutoId",
                table: "ItensCarrinho",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProdutoId",
                table: "ItensCarrinho");
        }
    }
}
