using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Core.Security.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class RoleController : Controller
    {
        // GET: Role
        [HttpGet]
        public JsonNetResult GetRoles()
        {
            var msg = "{\"GetAllRoles\":{}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Role.Plugin");
            var data = JsonConvert.DeserializeObject<List<Role>>(response);
            return new JsonNetResult
            {
                Data = new {roles = data}
            };
        }
    }
}