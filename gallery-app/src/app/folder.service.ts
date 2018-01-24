import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { PictureService } from './picture.service'
import { Folder } from './folder';

@Injectable()
export class FolderService {

  private apiUrl = 'http://localhost/GalleryBackend/api/folder/';

  constructor(private http: Http, private pictureService: PictureService) {
    this.getAllFolders();
  }

  getAllFolders(): Observable<Array<Folder>> {
    return this.http.get(this.apiUrl).map((res: Response) => res.json());
  }

  createFolder(folder: Folder) {
    return this.http.post(this.apiUrl, { name: folder.name, description: folder.description, miniatureId: folder.miniatureID }).map((res: Response) => res.json());
  }

  updateFolder(folder: Folder) {
    return this.http.put(this.apiUrl + folder.id + "/", { id: folder.id, name: folder.name, description: folder.description, miniatureId: folder.miniatureID }).map((res: Response) => res.json());
  }

  deleteFolder(id: number) {
    return this.http.delete(this.apiUrl + id + "/").map((res: Response) => res.json());
  }

  getFolder(id: number) {
    return this.http.get(this.apiUrl + id).map((res: Response) => res.json());
  }

  getFolderMiniature(miniatureId: number) {
    return this.pictureService.getPicture(miniatureId).url;
  }

}
