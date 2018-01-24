using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GalleryBackend.Models
{
    public class PictureModel
    {
        public string id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public string folderID { get; set; }
    }
}