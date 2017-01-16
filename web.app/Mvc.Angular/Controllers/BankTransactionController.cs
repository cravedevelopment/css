using System;
using System.IO;
using System.Web.Mvc;
using Core.Common.Model;
using CSS.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using CSS.Plugin.Model;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class BankTransactionController : Controller
    {
        // GET: BankTransaction
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
        public ActionResult ReportImport()
        {
            return PartialView("_ReportImport");
        }
        [HttpGet]
        public JsonNetResult GetBankTransaction(int id)
        {

            var pluginModel = new BankTransactionPluginModel
            {
                TransactionId = id
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);

            var msg = "{\"GetBankTransactionById\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransaction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransactionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpPost]
        public JsonNetResult GetBankTransactions(PluginTransaction obj)
        {
            var pluginModel = new BankTransactionPluginModel
            {
                PageSize = obj.PageSize,
                CurrentPageNumber = obj.CurrentPageNumber,
                SortDirection = obj.SortDirection,
                SortExpression = obj.SortExpression
            };
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetAllBankTransactions\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransaction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransactionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }

        public JsonNetResult AddBankTransaction(BankTransaction transaction)
        {
            var pluginModel = new BankTransactionPluginModel { BankTransaction = transaction };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"AddBankTransaction\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransaction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransactionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        public JsonNetResult UpdateBankTransaction(BankTransaction transaction)
        {
            var pluginModel = new BankTransactionPluginModel { BankTransaction = transaction };
            var stringObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"UpdateBankTransaction\":{\"PluginModel\":" + stringObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransaction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransactionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
        [HttpPost]
        public JsonNetResult Import(int bankId, string bankCode)
        {
            var pluginModel = new BankTransactionPluginModel();
            foreach (string file in Request.Files)
            {
                var fileContent = Request.Files[file];
                if (fileContent == null || fileContent.ContentLength <= 0) continue;
                var inputStream = fileContent.InputStream;
                var fileName = Path.GetFileName(fileContent.FileName);
                var extension = Path.GetExtension(fileName);
                if (fileName != null && !fileName.Contains(bankCode))
                {
                    pluginModel.ReturnMessage.Add("Cannot import file: " + fileName + "Invalid bank selected");
                    pluginModel.ReturnStatus = false;
                    continue;
                }
                if (fileName != null)
                {

                    var sFileDate = Path.GetFileNameWithoutExtension(fileName);
                    sFileDate = sFileDate.Replace(bankCode, string.Empty);

                    if (sFileDate.Length == 8)
                    {
                        DateTime fileDate;
                        var m = sFileDate.Substring(0, 2);
                        var d = sFileDate.Substring(2, 2);
                        var y = sFileDate.Substring(4, 4);
                        sFileDate = string.Format("{0}/{1}/{2}", m, d, y);
                        if (DateTime.TryParse(sFileDate, out fileDate))
                        {
                            if (DateTime.Now <= fileDate)
                            {
                                pluginModel.ReturnMessage.Add("Cannot import file: " + fileName + ". You can only upload from previous day transaction");
                                pluginModel.ReturnStatus = false;
                                continue;
                            }
                        }
                    }
                    else
                    {
                        pluginModel.ReturnMessage.Add("Cannot import file: " + fileName + ". Invalid file date format");
                        pluginModel.ReturnStatus = false;
                        continue;
                    }
                }
                if (extension == ".csv")
                {
                    string fileDataSerialized;
                    using (var reader = new BinaryReader(inputStream))
                    {
                        var stream = reader.ReadBytes(fileContent.ContentLength);
                        fileDataSerialized = Convert.ToBase64String(stream);
                    }
                    var bankTransaction = new BankTransaction() { BankCode = bankCode, BankId = bankId };
                    pluginModel.ImportFileData = fileDataSerialized;
                    pluginModel.BankTransaction = bankTransaction;
                    var stringObj = JsonConvert.SerializeObject(pluginModel);
                    var msg = "{\"ImportBankTransactions\":{\"PluginModel\":" + stringObj + "}}";
                    var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransaction.Plugin");
                    pluginModel = JsonConvert.DeserializeObject<BankTransactionPluginModel>(response);
                }
                else
                {
                    pluginModel.ReturnMessage.Add("Cannot import file: " + fileName + ". Invalid File format");
                    pluginModel.ReturnStatus = false;
                }
            }
            return new JsonNetResult
            {
                Data = pluginModel
            };
        }

        [HttpGet]
        public JsonNetResult GetNumberOfTransactions()
        {
            var pluginModel = new BankTransactionPluginModel();
            var jsonObj = JsonConvert.SerializeObject(pluginModel);
            var msg = "{\"GetNumberOfTransactions\":{\"PluginModel\":" + jsonObj + "}}";
            var response = CSSQueue.SendMessage(Session["token"].ToString(), msg, "BankTransaction.Plugin");
            var data = JsonConvert.DeserializeObject<BankTransactionPluginModel>(response);
            return new JsonNetResult
            {
                Data = data
            };
        }
    }
}