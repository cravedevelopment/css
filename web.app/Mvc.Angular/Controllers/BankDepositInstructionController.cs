using System.Web.Mvc;
using Core.Common.Model;
using CSS.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using CSS.Plugin.Model;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class BankDepositInstructionController : Controller
    {
        // GET: BankTransferInstruction
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
        public JsonNetResult GetDepositInstruction(int id)
        {

            var pluginModel = new BankDepositInstructionPluginModel
            {
                Id = id
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);

            var msg = "{\"GetDepositInstructionById\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankDepositInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankDepositInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpPost]
        public JsonNetResult GetDepositInstructions(PluginTransaction obj)
        {
            var pluginModel = new BankDepositInstructionPluginModel()
            {
                PageSize = obj.PageSize,
                CurrentPageNumber = obj.CurrentPageNumber,
                SortDirection = obj.SortDirection,
                SortExpression = obj.SortExpression
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetAllDepositInstructions\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankDepositInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankDepositInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult AddDepositInstruction(BankDepositInstruction instruction)
        {
            var pluginModel = new BankDepositInstructionPluginModel { BankDepositInstruction = instruction };

            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"AddDepositInstruction\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankDepositInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankDepositInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult UpdateDepositInstruction(BankDepositInstruction instruction)
        {
            var pluginModel = new BankDepositInstructionPluginModel { BankDepositInstruction = instruction };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"UpdateDepositInstruction\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankDepositInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankDepositInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
    }
}