using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class AddIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_User_BirthDate",
                table: "Users",
                column: "BirthDate");

            migrationBuilder.CreateIndex(
                name: "IX_User_Gender",
                table: "Users",
                column: "Gender");

            migrationBuilder.CreateIndex(
                name: "IX_User_PreferredAge",
                table: "Users",
                columns: new[] { "PreferredMinAge", "PreferredMaxAge" });

            migrationBuilder.CreateIndex(
                name: "IX_User_PreferredLocation",
                table: "Users",
                column: "PreferredLocationRange");

            migrationBuilder.CreateIndex(
                name: "IX_UserLocation_LatLon",
                table: "UserLocations",
                columns: new[] { "Latitude", "Longitude" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_User_BirthDate",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_User_Gender",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_User_PreferredAge",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_User_PreferredLocation",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_UserLocation_LatLon",
                table: "UserLocations");
        }
    }
}
