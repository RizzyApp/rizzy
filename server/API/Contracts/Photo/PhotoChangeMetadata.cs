using API.Utils.Validators;

namespace API.Contracts.Photo;

public record PhotoChangeMetadata(PhotoChangesActionType Action, int? Id);