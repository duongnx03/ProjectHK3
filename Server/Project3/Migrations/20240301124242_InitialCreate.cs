using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Project3.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogPosts",
                columns: table => new
                {
                    BlogPostId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", maxLength: 10000, nullable: false),
                    Author = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DatePublished = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPosts", x => x.BlogPostId);
                });

            migrationBuilder.CreateTable(
                name: "Membership",
                columns: table => new
                {
                    MembershipId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Phone = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    DateReigsterMembership = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Membership", x => x.MembershipId);
                });

            migrationBuilder.CreateTable(
                name: "OrderQuantitys",
                columns: table => new
                {
                    OrderQuantityId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    WashTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeToFinishWashing = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerEmail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderQuantitys", x => x.OrderQuantityId);
                });

            migrationBuilder.CreateTable(
                name: "OrderWeights",
                columns: table => new
                {
                    OrderWeightId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    Weight = table.Column<int>(type: "int", nullable: false),
                    WashTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TimeToFinishWashing = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CustomerName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerPhone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CustomerEmail = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderWeights", x => x.OrderWeightId);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProductName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProductDescription = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                });

            migrationBuilder.CreateTable(
                name: "UserConnections",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ConnectionId = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserConnections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(250)", maxLength: 250, nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Membership = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RegisterTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Avatar = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsConfirmed = table.Column<bool>(type: "bit", nullable: true),
                    ConfirmationCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConfirmationCodeExpires = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ConfirmationCodeToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    isBan = table.Column<bool>(type: "bit", nullable: false),
                    isOnline = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConnectionId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastActivity = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "BlogPostId", "Author", "Content", "DatePublished", "ImageUrl", "Title" },
                values: new object[,]
                {
                    { 1, "John Doe", "This is the content of the first blog post.", new DateTime(2024, 2, 23, 12, 42, 42, 295, DateTimeKind.Utc).AddTicks(9820), "cat.jpg", "First Blog Post" },
                    { 2, "Jane Doe", "This is the content of the second blog post.", new DateTime(2024, 2, 25, 12, 42, 42, 295, DateTimeKind.Utc).AddTicks(9830), "cat.jpg", "Second Blog Post" }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "ProductId", "ProductDescription", "ProductName" },
                values: new object[] { 1, "The amount that you have to pay should be based on your kilograms", "Washing by Kilograms" });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Address", "Avatar", "ConfirmationCode", "ConfirmationCodeExpires", "ConfirmationCodeToken", "ConnectionId", "Email", "FullName", "IsConfirmed", "LastActivity", "Membership", "Password", "Phone", "RegisterTime", "Role", "UserName", "isBan", "isOnline" },
                values: new object[] { 1, "HCM", null, null, null, null, null, "onlinelaundry.126@gmail.com", "Online Laundry", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), null, "$2a$11$zjjPtiv3b3KPrxj9eKg.yesAUWU.1fB5PTcf0OGzTxaebB3b7xNsW", "0123456789", new DateTime(2024, 3, 1, 19, 42, 42, 295, DateTimeKind.Local).AddTicks(8890), "Admin", "admin", false, "Online" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogPosts");

            migrationBuilder.DropTable(
                name: "Membership");

            migrationBuilder.DropTable(
                name: "OrderQuantitys");

            migrationBuilder.DropTable(
                name: "OrderWeights");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "UserConnections");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
