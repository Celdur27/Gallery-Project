using GalleryBackend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace GalleryBackend.Controllers
{
    [EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class FolderController : ApiController
    {
        public List<FolderModel> Get()
        {
            return FolderRepository.GetAllFolders();
        }

        public FolderModel Get(string id)
        {
            return FolderRepository.GetFolder(id);
        }

        public void Post([FromBody] FolderModel folder)
        {
            FolderRepository.AddFolder(folder);
        }

        public void Put([FromBody] FolderModel folder)
        {
            FolderRepository.EditFolder(folder);
        }

        public void Delete(string id)
        {
            FolderRepository.DeleteFolder(id);
        }
    }
}
