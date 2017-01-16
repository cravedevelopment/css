using System.Web.Mvc;

namespace Project.Mvc.Angular.Controllers
{
    public class LogoutController : Controller
    {
        // GET: Logout
        public ActionResult Index()
        {
            Session.Clear();
            return RedirectToAction("Index", "Login");
        }
    }
}