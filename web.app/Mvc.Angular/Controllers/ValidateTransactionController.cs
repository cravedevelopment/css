using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Script.Serialization;
using Core.Utilities.Cryptography;
using CSS.Model;
using CSS.MVC.Angular.Controllers.CustomActionResult;
using CSS.MVC.Angular.Models;
using CSS.Plugin.Model;
using CSS.Service.Implementations;
using CSS.Service.Interfaces;
using EF.Repository.Factory;
using EF.Repository.Providers;
using EF.Repository.UnitOfWork.CSS;
using Newtonsoft.Json;

namespace CSS.MVC.Angular.Controllers
{
    public class ValidateTransactionController : ApiController
    {
        readonly IBankTransactionService _svc = new BankTransactionService(new CSSUow(new RepositoryProvider(new RepositoryFactories())));
        [AcceptVerbs("GET", "POST")]
        public string Update(string referenceNo, double amount, string p2PUserId)
        {
            var simple = new BankTransactionSimple();
            try
            {

                var tran = _svc.GetBankTransactionByReferenceNo(referenceNo);
                if (tran != null)
                {
                    if (tran.CreditAmount != amount)
                    {
                       return "Failed - the transaction does not match the exact amount.";
                    }
                    if (tran.TransactionStatus == TransactionStatus.Settled)
                    {
                        return "Failed - the transaction is already settled.";
                    }
                    tran.TransactionStatus = TransactionStatus.Settled;
                    _svc.UpdateBankTransaction(tran, p2PUserId);
                    return "Transaction successfully updated.";
                }
                return "Failed - the transaction not found.";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}