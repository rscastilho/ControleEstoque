using Microsoft.EntityFrameworkCore.Migrations;

namespace estoque.api.Migrations
{
    public partial class tipopagamento : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TiposPagamentos",
                table: "Pedidos",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ItensCarrinho_ProdutoId",
                table: "ItensCarrinho",
                column: "ProdutoId");

            migrationBuilder.AddForeignKey(
                name: "FK_ItensCarrinho_Produtos_ProdutoId",
                table: "ItensCarrinho",
                column: "ProdutoId",
                principalTable: "Produtos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ItensCarrinho_Produtos_ProdutoId",
                table: "ItensCarrinho");

            migrationBuilder.DropIndex(
                name: "IX_ItensCarrinho_ProdutoId",
                table: "ItensCarrinho");

            migrationBuilder.DropColumn(
                name: "TiposPagamentos",
                table: "Pedidos");
        }
    }
}
