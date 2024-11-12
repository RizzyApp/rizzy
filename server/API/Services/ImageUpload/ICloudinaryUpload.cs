using CloudinaryDotNet.Actions;

namespace API.Services.ImageUpload;

public interface ICloudinaryUpload
{
    public Task<ImageUploadResult> Upload(IFormFile image);
}