using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.Owin;
using Owin;
using System.Web.Services.Description;
using VDMS.ContentRepository.Helper;
using MongoDB.Bson.Serialization;
using VDMS.Identity.Models;

[assembly: OwinStartup(typeof(VDMS5_MVC.Startup))]

namespace VDMS5_MVC
{
    public partial class Startup
    {
        //public void ConfigureServices(IServiceCollection services)
        //{
        //    services.Configure<CookiePolicyOptions>(options =>
        //    {
        //        options.CheckConsentNeeded = context => true;
        //        options.MinimumSameSitePolicy = SameSiteMode.None;
        //    });

        //    services.AddDistributedMemoryCache();

        //    services.AddSession(options =>
        //    {
        //        // Set a short timeout for easy testing.
        //        options.IdleTimeout = TimeSpan.FromSeconds(10);
        //        options.Cookie.HttpOnly = true;
        //    });

        //    services.AddMvc()
        //        .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        //}

        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

            //Start VDMS system
            ContentRepositoryHelper.ResetCache();
            ContentRepositoryHelper.StartSecurity();

            //Register BsonClassMap
            BsonClassMap.RegisterClassMap<DefaultUserInformation>();
        }
    }
}
