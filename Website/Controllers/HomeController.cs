using System.Data;
using System.Web.Mvc;
using VDMS.Library.Provider;
using VDMS.Library.Provider.Model;
using VDMS.Web.Library.AJAX;

namespace VDMS5_MVC.Controllers
{
    [MvcAuthorize]
    public class HomeController : BaseController
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
