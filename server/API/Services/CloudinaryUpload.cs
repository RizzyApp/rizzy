using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Services;

public class CloudinaryUpload : ICloudinaryUpload
{

    private readonly Cloudinary _cloudinaryService;

    public CloudinaryUpload(Cloudinary cloudinaryService)
    {
        _cloudinaryService = cloudinaryService;
    }

    public async Task<ImageUploadResult> Upload(IFormFile image)
    {
        
        if (image == null || image.Length == 0)
            throw new ArgumentException("Image file is required");
        
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(Guid.NewGuid().ToString(), image.OpenReadStream())
        };


        var uploadResult = await _cloudinaryService.UploadAsync(uploadParams);
        return uploadResult;
    }
}