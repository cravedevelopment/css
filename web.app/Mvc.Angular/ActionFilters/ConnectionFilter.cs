using System;
using System.Web;
using System.Web.Mvc;

namespace CSS.MVC.Angular.ActionFilters
{
    public class ConnectionFilter : ActionFilterAttribute
    {
        public bool ShowPopup { get; set; }
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            HttpContext ctx = HttpContext.Current;
            try
            {
                // Auto login use for future use //
                if (ctx.Session["token"] == null)
                    //||
                    //(ctx.Session["temp-login"] != null
                    //&& !ctx.Request.RawUrl.Contains("/Security/ResetPassword")))
                {
                    //var par = "";
                    //var parCount = 0;
                    //foreach (var value in filterContext.RouteData.Values)
                    //{
                    //    parCount++;
                    //    par += string.Format("{0}parameter{1}={2}", (parCount == 1 ? "?" : "&"), parCount, value.Value);
                    //}
                    filterContext.Result = new RedirectResult("~/Security/Index/");
                }
                base.OnActionExecuting(filterContext);
            }
            catch (Exception ex)
            {
                ctx.Session["errormessage"] = ex.Message;
                filterContext.Result = new RedirectResult("~/Security/Logout/");
            }
        }
    }
}