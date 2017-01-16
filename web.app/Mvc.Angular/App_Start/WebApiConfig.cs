using System.Web.Http;
using System.Web.Mvc;

namespace CSS.MVC.Angular
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { controller = "ValidateTransaction", action = "Update", id = RouteParameter.Optional }
            );

        }
    }
}