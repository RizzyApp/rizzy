namespace API.Services.ImageUpload;

public interface IImageValidationService
{
     bool IsFileSizeValid(long fileSize);
     public bool IsResolutionAndAspectRatioValid(IFormFile image);
}