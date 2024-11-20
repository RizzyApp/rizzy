using API.Contracts;
using API.Contracts.Photo;
using API.Data.Models;
using API.Data.Repositories;
using API.Utils.Exceptions;

namespace API.Services.ImageUpload;

public class ImageService : IImageService
{
    private ICloudinaryService _cloudinaryService;
    private IImageValidationService _imageValidationService;
    private IRepository<Photo> _photoRepository;
    private ILogger<ImageService> _logger;
    private readonly int _maxImagesCount;
    private readonly IHostEnvironment _env;

    public ImageService(ICloudinaryService cloudinaryService, IImageValidationService imageValidationService, IConfiguration configuration, IRepository<Photo> photoRepository, ILogger<ImageService> logger, IHostEnvironment env)
    {
        _cloudinaryService = cloudinaryService;
        _imageValidationService = imageValidationService;
        _photoRepository = photoRepository;
        _logger = logger;
        _env = env;
        _maxImagesCount = configuration.GetValue<int>("ImageUploadSettings:MaximumImagesCount");
    }

    public async Task ValidateAndUpload(IFormFile image, int userId)
    {
        if (!_imageValidationService.IsFileSizeValid(image.Length))
        {
            _logger.LogWarning("Image exceeds maximum size for userId {UserId}.", userId);
            throw new BadRequestException("Image exceeds maximum size.");
        }
        
        //TODO: Fix the image resolution part
        /*
        if (!_imageValidationService.IsResolutionAndAspectRatioValid(image))
        {
            _logger.LogWarning("Invalid image resolution or aspect ratio for userId {UserId}.", userId);
            throw new BadRequestException("Image has the wrong aspect ratio or resolution exceeds maximum.");
        }
        */

        var result = await _cloudinaryService.Upload(image);

        var photo = new Photo
        {
            UserId = userId,
            CloudinaryAssetId = result.AssetId,
            Url = result.Url.ToString()
        };

        await _photoRepository.Add(photo);
        _logger.LogInformation("Successfully uploaded and saved photo for userId {UserId}.", userId);
    }

    public async Task DeleteImage(int photoId, int userId)
    {
        var photo = await _photoRepository.GetById(photoId);

        if (photo is null)
        {
            throw new BadRequestException($"Photo with id {photoId} does not exist");
        }

        if (photo.UserId != userId)
        {
            _logger.LogWarning("Unauthorized deletion attempt: PhotoId {PhotoId} by userId {UserId}.", photoId, userId);
            throw new UnauthorisedException();
        }

        if (photo.CloudinaryAssetId is not null && _env.IsDevelopment())
        {
            _cloudinaryService.Delete(photo.CloudinaryAssetId);
        }

        await _photoRepository.Delete(photoId);
        _logger.LogInformation("Successfully deleted photo with id {PhotoId} for userId {UserId}.", photoId, userId);
    }

    public async Task HandleChanges(IEnumerable<PhotoChangeMetadata> metadata, List<IFormFile> files, int userId)
    {
        metadata = metadata.ToList();
        var userPhotos = await _photoRepository.Search(p => p.UserId == userId);
        userPhotos = userPhotos.ToList();

        var imagesAdded = metadata.Count(m => m.Action is PhotoChangesActionType.ADD);
        var imagesDeleted = metadata.Count(m => m.Action is PhotoChangesActionType.DELETE);

        if (userPhotos.Count() + imagesAdded - imagesDeleted > _maxImagesCount)
        {
            _logger.LogWarning("User {UserId} exceeds the maximum image count {MaxImagesCount}.", userId, _maxImagesCount);
            throw new BadRequestException($"Cannot have more than {_maxImagesCount} images.");
        }

        await _photoRepository.BeginTransactionAsync();
        try
        {
            var fileIndex = 0;
            foreach (var item in metadata)
            {
                if (item.Action == PhotoChangesActionType.ADD)
                {
                    if (fileIndex >= files.Count())
                    {
                        throw new BadRequestException("File is missing from metadata for the ADD action.");
                    }
                    
                    await ValidateAndUpload(files[fileIndex], userId);
                    fileIndex++;
                }
                else if (item.Action == PhotoChangesActionType.DELETE)
                {
                    if (!item.Id.HasValue)
                    {
                        throw new BadRequestException("Id is missing for the DELETE action.");
                    }

                    await DeleteImage(item.Id.Value, userId);
                }
                else if (item.Action == PhotoChangesActionType.KEEP)
                {
                    if (!item.Id.HasValue)
                    {
                        throw new BadRequestException("Id is missing for the KEEP action.");
                    }

                    var photoToKeep = userPhotos.FirstOrDefault(p => p.Id == item.Id);
                    if (photoToKeep == null)
                    {
                        throw new BadRequestException($"Photo with id {item.Id} does not exist.");
                    }
                }
            }

            await _photoRepository.CommitAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while handling changes for userId {UserId}. Rolling back transaction.", userId);
            await _photoRepository.RollbackAsync();
            throw;
        }
    }
}
