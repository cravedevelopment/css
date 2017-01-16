using System.Web.Mvc;
using Core.Common.Model;
using CSS.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using CSS.Plugin.Model;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class BankController : Controller
    {
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

        // GET: Bank
        [HttpGet]
        public JsonNetResult GetBanksDropdown()
        {
            var pluginModel = new BankPluginModel();
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetBanksDropdown\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Bank.Plugin");
            var data = JsonConvert.DeserializeObject<BankPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpGet]
        public JsonNetResult GetBank(int id)
        {
            var pluginModel = new BankPluginModel { BankId = id };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetBankById\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Bank.Plugin");
            var data = JsonConvert.DeserializeObject<BankPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpPost]
        public JsonNetResult GetBanks(PluginTransaction obj)
        {
            var pluginModel = new BankPluginModel
            {
                PageSize = obj.PageSize,
                CurrentPageNumber = obj.CurrentPageNumber,
                SortDirection = obj.SortDirection,
                SortExpression = obj.SortExpression
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetAllBanks\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Bank.Plugin");
            var data = JsonConvert.DeserializeObject<BankPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult AddBank(Bank bank)
        {
            var pluginModel = new BankPluginModel { Bank = bank };

            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"AddBank\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Bank.Plugin");
            var data = JsonConvert.DeserializeObject<BankPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult UpdateBank(Bank bank)
        {
            var pluginModel = new BankPluginModel { Bank = bank };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"UpdateBank\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "Bank.Plugin");
            var data = JsonConvert.DeserializeObject<BankPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
    }
}