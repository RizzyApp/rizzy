using System.ComponentModel.DataAnnotations;

namespace API.Utils.Validators;

public class MinAgeAttribute : ValidationAttribute
{
    private readonly int _minAge;

    public MinAgeAttribute(int minAge)
    {
        _minAge = minAge;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is DateTime birthDate)
        {
            var age = DateTime.Now.Year - birthDate.Year;
            if (DateTime.Now.DayOfYear < birthDate.DayOfYear)
            {
                age--;
            }

            if (age < _minAge)
            {
                return new ValidationResult($"User must be at least {_minAge} years old.");
            }
        }

        return ValidationResult.Success;
    }
}