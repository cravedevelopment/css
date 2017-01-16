using System.Web.Mvc;
using CSS.MVC.Angular.ActionFilters;

namespace CSS.MVC.Angular.Controllers
{
    public class HomeController : Controller
    {
        [ConnectionFilter]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Dashboard()
        {
            return PartialView("_Dashboard");
        }
        
    }
}
