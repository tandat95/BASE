using System.Web.Mvc;
using VDMS.Library.Provider;
using VDMS.Library.Provider.Manager;

namespace VDMS5_MVC.Controllers
{
    [ApiAuthorize]
    public class BaseController : Controller
    {
        //public string UserName { get; set; }

        //public bool Dashboard = false;
        //public bool Manage = false;
        //public bool Explore = false;
        //public bool Report = false;
        //public bool Admin = false;
        //public bool Editor = false;

        protected void CheckRole() {

            //ViewBag._GetAuthenticatInfo = "var VDMS_AUTH = {USERNAME: '" + User.Identity.Name + "',SESSION_TIMEOUT: " + (Session.Timeout * 60 * 1000 + 10) + ", IP: '" + Request.ServerVariables["REMOTE_ADDR"] + "'};";
            ////ViewBag._GetAuthenticatInfo = "var VDMS_AUTH = {USERNAME: '" + User.Identity.Name + "',SESSION_TIMEOUT: " + Session.Timeout + ", IP: '" + Request.ServerVariables["REMOTE_ADDR"] + "'};";
            //long total;
            //var listNode = NodeManager.GetChildren("/Root/VDMS/HeThong/Feature/TIMS", out total);

            //foreach (var nodeInfo in listNode)
            //{
            //    switch (nodeInfo.Title)
            //    {
            //        case "Dashboard":
            //            Dashboard = true;
            //            break;
            //        case "Manage":
            //            Manage = true;
            //            break;
            //        case "Explore":
            //            Explore = true;
            //            break;
            //        case "Report":
            //            Report = true;
            //            break;
            //        case "Editor":
            //            Editor = true;
            //            break;
            //        case "Admin":
            //            Admin = true;
            //            break;
            //    }
            //}

            //ViewBag._GetRolesInfo = string.Format("var VDMS_ROLES = {{Dashboard: {0},Manage: {1},Explore: {2},Report: {3},Admin: {4}, Editor:{5}}};", Dashboard.ToString().ToLower(), Manage.ToString().ToLower(), Explore.ToString().ToLower(), Report.ToString().ToLower(), Admin.ToString().ToLower(), Editor.ToString().ToLower());
        }

        public BaseController() {
            //this.CheckRole();
        }
    }
}