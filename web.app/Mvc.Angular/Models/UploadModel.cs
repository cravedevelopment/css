using System.Web;

namespace CSS.MVC.Angular.Models
{
    public class UploadModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public HttpPostedFileBase Attachment { get; set; }
    }
}