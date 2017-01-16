using System;
using System.Configuration;
using System.Globalization;
using System.IO;
using Core.Utilities.Compression;
using CSS.MVC.Angular.QUEUEApi;

namespace CSS.MVC.Angular.Models
{
    public static class CSSQueue
    {
        public static string SendMessage(string token, string queueMessage, string queueAssembly)
        {
            try
            {
                QueueClient client = new QueueClient("BasicHttpBinding_IQueue", ConfigurationManager.AppSettings["EndPointAddress"]);
                System.Threading.Thread.CurrentThread.CurrentUICulture = new CultureInfo("en-GB", false);
                return client.RunPluginPost(token, queueAssembly, queueMessage).Decompress();
            }
            catch (Exception ex)
            {
                if (ex.Message.Contains("http"))
                    throw new Exception("Problems connecting to Server.");
                throw;
            }
        }
        public static Stream StreamMessage(string token, string queueMessage, string queueAssembly)
        {
            try
            {
                QueueClient client = new QueueClient("BasicHttpBinding_IQueue", ConfigurationManager.AppSettings["EndPointAddress"]);
                return client.StreamMessage(token, queueAssembly, queueMessage);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}