using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GalleryBackend.Models
{
    public class FolderModel
    {
        public string id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string miniatureID { get; set; }
    }
}