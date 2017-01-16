using System.Web.Mvc;
using Core.Plugin.Model;
using Core.Security.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using Newtonsoft.Json;
using PluginTransaction = Core.Common.Model.PluginTransaction;

namespace CSS.MVC.Angular.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        public ActionResult List()
        {
            return PartialView("_List");
        }

        public ActionResult Create()
        {
            return PartialView("_Create");
        }

        public ActionResult Edit()
        {
            return PartialView("_Edit");
        }
        [HttpGet]
        public JsonNetResult GetUser(int id)
        {
            var pluginModel = new SecurityPluginModel { UserMasterId = id };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetUserByUserId\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Security.Plugin");
            var data = JsonConvert.DeserializeObject<SecurityPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpPost]
        public JsonNetResult GetUsers(PluginTransaction inquiry)
        {
            var pluginModel = new SecurityPluginModel()
            {
                PageSize = inquiry.PageSize,
                CurrentPageNumber = inquiry.CurrentPageNumber,
                SortDirection = inquiry.SortDirection,
                SortExpression = inquiry.SortExpression
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetAllUsers\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Security.Plugin");
            var data = JsonConvert.DeserializeObject<SecurityPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }

        public JsonNetResult Save(UserMaster userMasterDetail)
        {
            var pluginModel = new SecurityPluginModel { UserMaster = userMasterDetail };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"SaveUser\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Security.Plugin");
            var data = JsonConvert.DeserializeObject<SecurityPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult Update(UserMaster userMasterDetail)
        {
            var pluginModel = new SecurityPluginModel { UserMaster = userMasterDetail };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"UpdateUser\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Security.Plugin");
            var data = JsonConvert.DeserializeObject<SecurityPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }

        [HttpPost]
        public void Delete(long id)
        {
            var msg = "{\"DeleteUser\":{\"Id\":" + id + "}}";
            CSSQueue.SendMessage(Session["token"].ToString(), msg, "Security.Plugin");
        }
    }
}