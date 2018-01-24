import { Component, OnInit } from '@angular/core';
import { FolderService } from '../folder.service';
import { PictureService } from '../picture.service'
import { Folder } from '../folder';
import { Picture } from '../picture';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent implements OnInit {

  public newFolderModalOpened: boolean = false;
  public editFolderModalOpened: boolean = false;
  private removeErrorModalOpened: boolean = false;
  private folderList: Array<Folder> = [];
  private pictureList: Array<Picture> = [];
  private pictureListPerFolder: Array<Picture> = [];
  private newFolder: Folder;
  private modifiedFolder: Folder;

  constructor(private folderService: FolderService, private pictureService: PictureService) { 
    this.pictureService.getAllPictures().subscribe(picList => {
      this.pictureList = picList;
    });
  }

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.getFolders();
  }

  getMiniature(id: number) {
    let imgSrc: string = "";
    for (let pic of this.pictureList) {
      if(pic.id == id) {
        imgSrc = pic.url;
      }
    }

    if(!imgSrc) {
      imgSrc = "../../assets/img/placeholder.jpg";
    }
    console.log("Dane miniatury");
    console.log(id);
    console.log(imgSrc);
    return imgSrc;
  }

  getFolders() {
    this.folderService.getAllFolders().subscribe(folders => {
      this.folderList = folders;
    });  
  }

  public openNewFolderModal() {
    this.newFolder = new Folder();
    this.newFolderModalOpened = true;
  }

  public closeNewFolderModal() {
    this.newFolderModalOpened = false;
  }

  public openEditFolderModal(folder: Folder) {
    this.modifiedFolder = new Folder();
    this.pictureListPerFolder = new Array<Picture>();

    this.modifiedFolder = {
      id: folder.id,
      name: folder.name,
      description: folder.description,
      miniatureID: folder.miniatureID
    };

    for(let pic of this.pictureList) {
      if(pic.folderID == this.modifiedFolder.id) {
        this.pictureListPerFolder.push(pic);
      }
    }
    this.editFolderModalOpened = true;
  }

  public closeEditFolderModal() {
    this.editFolderModalOpened = false;
  }

  public openRemoveErrorModal() {
    this.removeErrorModalOpened = true;
  }

  public closeRemoveErrorModal() {
    this.removeErrorModalOpened = false;
  }

  public addFolder() {
    let folderToSend: Folder = {
      id: 0,
      name: this.newFolder.name,
      description: this.newFolder.description,
      miniatureID: this.newFolder.miniatureID
    }

    this.folderService.createFolder(folderToSend).subscribe(list => {
      this.refresh();
    });

    this.closeNewFolderModal();
  }

  public editFolder(id: number) {
    let folderToSend: Folder = {
      id: this.modifiedFolder.id,
      name: this.modifiedFolder.name,
      description: this.modifiedFolder.description,
      miniatureID: this.modifiedFolder.miniatureID
    }

    console.log("Nowe Dane:");
    console.log(folderToSend);

    this.folderService.updateFolder(folderToSend).subscribe(list => {
      this.refresh();
    });

    this.closeEditFolderModal();
  }

  public removeFolder(id: number) {
    let canRemove: boolean = true; 
    for(let pic of this.pictureList) {
      if (pic.folderID === id) {
        canRemove = false;
        break;
      }
    }

    if(canRemove) {
      this.folderService.deleteFolder(id).subscribe(list => {
        this.refresh();
      });
    } else {
      this.openRemoveErrorModal();
    }
  }
}