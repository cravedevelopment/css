using System.Web.Mvc;

namespace CSS.MVC.Angular.Controllers.BaseControllers
{
    public abstract class BaseController : Controller
    {
        protected BaseController()
        {
            if (Session["UserSession"] == null)
            {
                this.RedirectToAction("Index", "Home");
            }
        }
    }
}