using API.Contracts;
using API.Contracts.Photo;
using API.Data.Models;

namespace API.Services.ImageUpload;

public interface IImageService
{
    Task ValidateAndUpload(IFormFile image, int userId);

    Task DeleteImage(int photoId, int userId);

    Task HandleChanges(IEnumerable<PhotoChangeMetadata> metadata, List<IFormFile> files, int userId);
}