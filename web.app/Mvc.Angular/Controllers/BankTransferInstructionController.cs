using System.Web.Mvc;
using Core.Common.Model;
using CSS.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using CSS.Plugin.Model;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class BankTransferInstructionController : Controller
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
        [HttpGet]
        public JsonNetResult GetTransferInstruction(int id)
        {

            var pluginModel = new BankTransferInstructionPluginModel
            {
                Id = id
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);

            var msg = "{\"GetBankTransferInstructionById\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransferInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransferInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpPost]
        public JsonNetResult GetTransferInstructions(PluginTransaction obj)
        {
            var pluginModel = new BankTransferInstructionPluginModel()
            {
                PageSize = obj.PageSize,
                CurrentPageNumber = obj.CurrentPageNumber,
                SortDirection = obj.SortDirection,
                SortExpression = obj.SortExpression
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetAllBankTransferInstructions\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransferInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransferInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult AddTransferInstruction(BankTransferInstruction instruction)
        {
            instruction.Status = TransactionStatus.Pending;
            var pluginModel = new BankTransferInstructionPluginModel { BankTransferInstruction = instruction };

            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"AddBankTransferInstruction\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransferInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransferInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult UpdateTransferInstruction(BankTransferInstruction instruction)
        {
            var pluginModel = new BankTransferInstructionPluginModel { BankTransferInstruction = instruction };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"UpdateBankTransferInstruction\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransferInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransferInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpGet]
        public JsonNetResult GetNumberOfTransferInstructions()
        {
            var pluginModel = new BankTransferInstructionPluginModel();
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetNumberOfTransferInstructions\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransferInstruction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransferInstructionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
    }
}