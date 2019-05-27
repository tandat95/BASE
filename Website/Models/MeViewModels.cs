using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VDMS5_MVC.Models
{
    // Models returned by MeController actions.
    public class GetViewModel
    {
        public string Hometown { get; set; }
    }
}