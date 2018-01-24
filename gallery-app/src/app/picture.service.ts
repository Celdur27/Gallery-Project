import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Picture } from './picture';

@Injectable()
export class PictureService {

  private apiUrl = 'http://localhost/GalleryBackend/api/picture/';

  constructor(private http: Http) {
    this.getAllPictures();
  }

  getAllPictures(): Observable<Array<Picture>> {
    return this.http.get(this.apiUrl).map((res: Response) => res.json());
  }

  createPicture(picture: Picture) {
    return this.http.post(this.apiUrl, { name: picture.name, description: picture.description, url: picture.url, folderID: picture.folderID }).map((res: Response) => res.json());
  }

  updatePicture(id: number, todoList) {
    return this.http.put(this.apiUrl + id + "/", { name: todoList }).map((res: Response) => res.json());
  }

  deletePicture(id: number) {
    return this.http.delete(this.apiUrl + id + "/").map((res: Response) => res.json());
  }

  getPicture(id: number) {
    let picture: Picture;
    this.getAllPictures().subscribe(pics => {
      for (let pic of pics) {
        if(pic.id == id) {
          picture = pic;
        }
      }
    });

    return picture;
    //return this.http.get(this.apiUrl + id).map((res: Response) => res.json());
  }

}
