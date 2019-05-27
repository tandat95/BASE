using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace VDMS5_MVC
{
    /// <summary>
    /// Summary description for MarkerIcon
    /// </summary>
    public class MarkerIcon : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "text/plain";
            try
            {
                var request = context.Request;
                if (!string.IsNullOrEmpty(request["act"]))
                {
                    var action = request["act"].ToString();

                    string dirFullPath = HttpContext.Current.Server.MapPath("~/images/upload/");

                    var folderExist = System.IO.Directory.Exists(dirFullPath);

                    if (!folderExist)
                    {
                        System.IO.Directory.CreateDirectory(dirFullPath);
                    }

                    string[] files;
                    int numFiles;
                    files = System.IO.Directory.GetFiles(dirFullPath);
                    numFiles = files.Length;

                    if (action == "upload")
                    {
                        numFiles = numFiles + 1;
                        string str_image = "";

                        foreach (string s in context.Request.Files)
                        {
                            HttpPostedFile file = context.Request.Files[s];
                            string fileName = file.FileName;
                            string fileExtension = file.ContentType;

                            if (!string.IsNullOrEmpty(fileName))
                            {
                                fileExtension = Path.GetExtension(fileName);
                                str_image = Guid.NewGuid() + fileExtension;
                                string pathToSave_100 = HttpContext.Current.Server.MapPath("~/images/upload/") + str_image;
                                file.SaveAs(pathToSave_100);
                            }
                        }

                        files[files.Length] = str_image;
                        context.Response.Write(JsonConvert.SerializeObject(getFileName(files)));
                    }
                    else //Get all file
                    {
                        context.Response.Write(JsonConvert.SerializeObject(getFileName(files)));
                    }
                }

            }
            catch (Exception ac)
            {

            }
        }

        private List<string> getFileName(string[] files)
        {
            var res = new List<string>();

            for (var i = 0; i < files.Length; i++)
            {
                var arr = files[i].Split('\\');

                res.Add(arr[arr.Length - 1]);
            }

            return res;
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}