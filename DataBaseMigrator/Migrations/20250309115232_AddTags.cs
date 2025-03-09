using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataBaseMigrator.Migrations
{
    /// <inheritdoc />
    public partial class AddTags : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tags",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Value = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Count = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CollectionTag",
                columns: table => new
                {
                    TagId = table.Column<long>(type: "bigint", nullable: false),
                    CollectionId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CollectionTag", x => new { x.CollectionId, x.TagId });
                    table.ForeignKey(
                        name: "FK_CollectionTag_Collections_CollectionId",
                        column: x => x.CollectionId,
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CollectionTag_Tags_TagId",
                        column: x => x.TagId,
                        principalTable: "Tags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CollectionTag_TagId",
                table: "CollectionTag",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_tag_count",
                table: "Tags",
                column: "Count");

            migrationBuilder.CreateIndex(
                name: "IX_tag_value",
                table: "Tags",
                column: "Value");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CollectionTag");

            migrationBuilder.DropTable(
                name: "Tags");
        }
    }
}
