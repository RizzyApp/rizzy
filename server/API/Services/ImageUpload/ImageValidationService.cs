using API.Utils.Exceptions;
using SixLabors.ImageSharp;

namespace API.Services.ImageUpload;

public class ImageValidationService : IImageValidationService
{
    private readonly int _maxFileSize;
    private readonly int _maxResolutionWidth;
    private readonly int _maxResolutionHeight;
    private readonly int _aspectRatioWidth;
    private readonly int _aspectRatioHeight;

    public ImageValidationService(IConfiguration config)
    {

        _maxFileSize = config.GetValue<int>("ImageUploadSettings:MaxFileSizeInBytes");
        _maxResolutionWidth = config.GetValue<int>("ImageUploadSettings:MaxResolutionWidth");
        _maxResolutionHeight = config.GetValue<int>("ImageUploadSettings:MaxResolutionHeight");
        _aspectRatioWidth = config.GetValue<int>("ImageUploadSettings:AspectRatioWidth");
        _aspectRatioHeight = config.GetValue<int>("ImageUploadSettings:AspectRatioHeight");
    }

    public bool IsFileSizeValid(long fileSize) => fileSize <= _maxFileSize;
    

    public bool IsResolutionAndAspectRatioValid(IFormFile image)
    {
        try
        {
            using var stream = image.OpenReadStream();
            var imageInfo = Image.Identify(stream); // Identify image metadata

            // Resolution check
            if (imageInfo.Width > _maxResolutionWidth || imageInfo.Height > _maxResolutionHeight)
            {
                return false; 
            }

            // Aspect ratio check
            var actualRatio = (double)imageInfo.Width / imageInfo.Height;
            var expectedRatio = (double)_aspectRatioWidth / _aspectRatioHeight;
            if (Math.Abs(actualRatio - expectedRatio) > 0.01) 
            {
                return false; 
            }

            return true; 
        }
        catch
        {
            throw new InvalidImageException();
        }
    }
    
    
}