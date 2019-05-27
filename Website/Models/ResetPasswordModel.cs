using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace VDMS5_MVC.Models
{
    public class ResetPasswordModel
    {
        public string e { get; set; } //Email
        public string u { get; set; } //User
        public string p { get; set; } //PrivateKey
        public DateTime d { get; set; } //DateTime
    }
}