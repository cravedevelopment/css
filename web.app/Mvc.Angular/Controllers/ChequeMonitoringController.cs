using System.Web.Mvc;
using Core.Common.Model;
using CSS.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using CSS.Plugin.Model;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class ChequeMonitoringController : Controller
    {
        // GET: ChequeMonitoring
       
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
        public JsonNetResult GetChequeMonitoring(int id)
        {
            var pluginModel = new ChequePluginModel() { ChequeId = id };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetChequeById\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "ChequeMonitoring.Plugin");
            var data = JsonConvert.DeserializeObject<ChequePluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpPost]
        public JsonNetResult GetChequeMonitorings(PluginTransaction obj)
        {
            var pluginModel = new ChequePluginModel
            {
                PageSize = obj.PageSize,
                CurrentPageNumber = obj.CurrentPageNumber,
                SortDirection = obj.SortDirection,
                SortExpression = obj.SortExpression
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetAllCheques\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "ChequeMonitoring.Plugin");
            var data = JsonConvert.DeserializeObject<ChequePluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }

        public JsonNetResult AddCheque(ChequeMonitoring cheque)
        {
            var pluginModel = new ChequePluginModel { ChequeMonitoring = cheque };

            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"AddCheque\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "ChequeMonitoring.Plugin");
            var data = JsonConvert.DeserializeObject<ChequePluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult UpdateCheque(ChequeMonitoring cheque)
        {
            var pluginModel = new ChequePluginModel { ChequeMonitoring = cheque };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"UpdateCheque\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "ChequeMonitoring.Plugin");
            var data = JsonConvert.DeserializeObject<ChequePluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
    }
}