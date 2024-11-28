using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Services.ImageUpload;

public class CloudinaryService : ICloudinaryService
{

    private readonly Cloudinary _cloudinarySdk;

    public CloudinaryService(Cloudinary cloudinarySdk)
    {
        _cloudinarySdk = cloudinarySdk;
    }

    public async Task<ImageUploadResult> Upload(IFormFile image)
    {
        
        if (image == null || image.Length == 0)
            throw new ArgumentException("Image file is required");
        
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(Guid.NewGuid().ToString(), image.OpenReadStream())
        };


        var uploadResult = await _cloudinarySdk.UploadAsync(uploadParams);
        return uploadResult;
    }

    public bool Delete(string assetId)
    {
        var deletionParams = new DeletionParams(assetId);

        var deletionResult = _cloudinarySdk.Destroy(deletionParams);

        return deletionResult.Result == "ok";
    }
}