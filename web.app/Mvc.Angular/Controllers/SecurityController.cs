using System;
using System.Configuration;
using System.Globalization;
using System.Web;
using System.Web.Mvc;
using Core.Plugin.Model;
using Core.Utilities.Cryptography;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using CSS.MVC.Angular.QUEUEApi;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class SecurityController : Controller
    {
        private readonly string _version = ConfigurationManager.AppSettings["VersionNo"];
        //
        // GET: /Login/

        public ActionResult Index(string parameter1, string parameter2, string parameter3, string parameter4,
            string parameter5)
        {
            Session.Timeout = 300;

            System.Threading.Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-GB", false);
            // first thing it needs to do is get the Version Number //
            Session["version"] = _version;
            return View(new LoginViewModel());
        }

        [HttpPost]
        public JsonNetResult Login(LoginViewModel login)
        {


            QueueClient client = new QueueClient("BasicHttpBinding_IQueue",
                ConfigurationManager.AppSettings["EndPointAddress"]);
            string response = client.AuthenticateUser(Encryption.Encrypt(login.UsernameOrEmail, "CSS12345!@#$%"), Encryption.Encrypt(login.Password, "CSS12345!@#$%"));

            var data = JsonConvert.DeserializeObject<SecurityPluginModel>(response);
            var user = data.UserMaster;
            if (!data.ReturnStatus)
                return new JsonNetResult
                {
                    Data = data
                };
            Session["UserSession"] = user;
            Session["token"] = user.Tokens[0].Token;

            return new JsonNetResult()
            {
                Data = data
            };
        }

        public ActionResult Logout()
        {

            // if it gets here we need to remove the cookies 
            var c = new HttpCookie("ExternalToken");
            c.Expires = DateTime.Now.AddDays(-1);
            Response.Cookies.Add(c);
            // end of cookie expiry

            var customEntity = Session["customizedentity"];
            Session.RemoveAll();
            Session.Clear();
            Session.Abandon();

            Session["errormessage"] = null;
            return RedirectToAction("Index", "Home");
        }
    }

}
