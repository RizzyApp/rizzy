using CloudinaryDotNet.Actions;

namespace API.Services.ImageUpload;

public interface ICloudinaryService
{
    Task<ImageUploadResult> Upload(IFormFile image);
    bool Delete(string assetId);
}