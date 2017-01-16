using System.Web.Mvc;
using Core.Common.Model;
using CSS.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using CSS.Plugin.Model;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class BankAccountController : Controller
    {
        // GET: BankAccount
        public ActionResult Index()
        {
            return View();
        }
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
        public JsonNetResult GetAccount(int id)
        {
            var pluginModel = new BankAccountPluginModel { AccountId = id };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetBankAccountById\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankAccount.Plugin");
            var data = JsonConvert.DeserializeObject<BankAccountPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpGet]
        public JsonNetResult GetBankAccountsDropdown()
        {
            var pluginModel = new BankAccountPluginModel();
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetBankAccountsDropdown\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankAccount.Plugin");
            var data = JsonConvert.DeserializeObject<BankAccountPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpPost]
        public JsonNetResult GetBankAccountsCompleteInfo(PluginTransaction obj)
        {
            var pluginModel = new BankAccountPluginModel
            {
                PageSize = obj.PageSize,
                CurrentPageNumber = obj.CurrentPageNumber,
                SortDirection = obj.SortDirection,
                SortExpression = obj.SortExpression
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetBankAccountsCompleteInfo\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankAccount.Plugin");
            var data = JsonConvert.DeserializeObject<BankAccountPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }

        [HttpPost]
        public JsonNetResult GetBankAccounts(PluginTransaction obj)
        {
            var pluginModel = new BankAccountPluginModel
            {
                PageSize = obj.PageSize,
                CurrentPageNumber = obj.CurrentPageNumber,
                SortDirection = obj.SortDirection,
                SortExpression = obj.SortExpression
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetAllBankAccounts\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankAccount.Plugin");
            var data = JsonConvert.DeserializeObject<BankAccountPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }

        public JsonNetResult AddAccount(BankAccount account)
        {
            var pluginModel = new BankAccountPluginModel { BankAccount = account };

            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"AddBankAccount\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankAccount.Plugin");
            var data = JsonConvert.DeserializeObject<BankAccountPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult UpdateAccount(BankAccount account)
        {
            var pluginModel = new BankAccountPluginModel { BankAccount = account };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"UpdateBankAccount\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankAccount.Plugin");
            var data = JsonConvert.DeserializeObject<BankAccountPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
    }
}