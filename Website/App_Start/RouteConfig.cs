using Combres;
using Microsoft.AspNet.FriendlyUrls;
using System.Web.Mvc;
using System.Web.Routing;

namespace VDMS5_MVC
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            //Register Combres
            routes.AddCombresRoute("Combres Route");
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            ////Register Webform
            routes.Ignore("{*allaspx}", new { allaspx = @".*\.aspx(/.*)?" });
            routes.Ignore("{*allashx}", new { allashx = @".*\.ashx(/.*)?" });
            routes.Ignore("{*allsvc}", new { allsvc = @".*\.svc(/.*)?" });
            routes.IgnoreRoute("{*favicon}", new { favicon = @"(.*/)?favicon.ico(/.*)?" });

            ////Register Ajaxpro
            routes.IgnoreRoute("ajaxpro/{ajax}.ashx/{*pathInfo}");

            //Register App VDMS
            routes.MapPageRoute("AppRoute",
                "App/{all}/", "~/default.aspx");

            //FriendlyUrl
            var settings = new FriendlyUrlSettings();
            settings.AutoRedirectMode = RedirectMode.Permanent;
            routes.EnableFriendlyUrls(settings);

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
