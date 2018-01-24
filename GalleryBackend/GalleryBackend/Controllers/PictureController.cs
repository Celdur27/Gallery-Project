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
    public class PictureController : ApiController
    {
        public List<PictureModel> Get()
        {
            return PictureRepository.GetAllPictures();
        }

        public PictureModel Get(string id)
        {
            return PictureRepository.GetPicture(id);
        }

        public void Post([FromBody] PictureModel picture)
        {
            PictureRepository.AddPicture(picture);
        }

        /*public void Put([FromBody] PictureModel picture)
        {
            PictureRepository.E(picture);
        }*/

        public void Delete(string id)
        {
            PictureRepository.DeletePicture(id);
        }
    }
}
