using System.ComponentModel.DataAnnotations;
using API.Contracts;
using API.Contracts.UserProfile;

namespace API.Utils.Validators
{
    public class MinAgeLessThanMaxAgeAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value is ProfileRequestDto profileRequest)
            {
                return profileRequest.PreferredMinAge < profileRequest.PreferredMaxAge;
            }

            return false;
        }

        public override string FormatErrorMessage(string name)
        {
            return "Preferred Min Age must be less than Preferred Max Age.";
        }
    }
}