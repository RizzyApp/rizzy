using CloudinaryDotNet.Actions;

namespace API.Services;

public interface ICloudinaryUpload
{
    public Task<ImageUploadResult> Upload(IFormFile image);
}