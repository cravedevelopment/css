using System.Configuration;

namespace CSS.MVC.Angular.Models
{
    public class LoginViewModel
    {
        public string ErrorMessage { get; set; }
        public string UsernameOrEmail { get; set; }
        public string Password { get; set; }

        public string AppVersion
        {
            get { return ConfigurationManager.AppSettings["appVersion"]; }
        }
    }
}