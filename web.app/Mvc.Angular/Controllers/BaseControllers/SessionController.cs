using System.Web.Mvc;

namespace CSS.MVC.Angular.Controllers.BaseControllers
{
    public class SessionController : Controller
    {
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            var user = Session["UserSession"];
            if (((user != null) || (Session.IsNewSession)) && (!Session.IsNewSession)) return;
            
            Session.RemoveAll();
            Session.Clear();
            Session.Abandon();
            Response.Redirect("~/Security/Login");
        }
    }
}