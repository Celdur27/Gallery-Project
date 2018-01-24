import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PictureService } from '../picture.service';
import { FolderService } from '../folder.service';
import { Location } from '@angular/common';
import { Picture } from '../picture';
import { Folder } from '../folder';

import { FileRestrictions, SelectEvent, ClearEvent, RemoveEvent, FileInfo } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-folder-details',
  templateUrl: './folder-details.component.html',
  styleUrls: ['./folder-details.component.scss']
})
export class FolderDetailsComponent implements OnInit {

  private currentFolderId: number;
  private pictureList: Array<Picture> = [];
  private newPicture: Picture;
  private fileUploadType: boolean = true;

  private newPictureModalOpened: boolean = false;
  private removeErrorModalOpened: boolean = false;

  private uploadRemoveUrl: string = "removeUrl";
  private uploadRestrictions: FileRestrictions = {
    allowedExtensions: [".jpg", ".png"]
  };
  private uploadSaveUrl: string = "saveUrl";
  public imagePreviews: FileInfo[] = [];

  constructor(private route: ActivatedRoute, private pictureService: PictureService, private folderService: FolderService, private location: Location) { }

  ngOnInit() {
    this.currentFolderId = +this.route.snapshot.paramMap.get('id');
    this.refresh();
  }

  refresh() {
    this.getPictures();
  }

  getPictures() {
    this.pictureList = [];
    this.pictureService.getAllPictures().subscribe(picList => {
      for(let pic of picList) {
        if(pic.folderID == this.currentFolderId) {
          this.pictureList.push(pic);
        }
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  public openNewPictureModal() {
    this.newPicture = new Picture();
    this.newPictureModalOpened = true;
  }

  public closeNewPictureModal() {
    this.newPictureModalOpened = false;
  }

  public openRemoveErrorModal() {
    this.removeErrorModalOpened = true;
  }

  public closeRemoveErrorModal() {
    this.removeErrorModalOpened = false;
  }

  public addPicture() {
    let pictureToSend: Picture = {
      id: 0,
      name: this.newPicture.name,
      description: this.newPicture.description,
      url: this.newPicture.url,
      folderID: this.currentFolderId
    }

    this.pictureService.createPicture(pictureToSend).subscribe(list => {
      this.refresh();
    });

    this.closeNewPictureModal();
  }

  public removePicture(id: number) {
    this.folderService.getFolder(this.currentFolderId).subscribe(fol => {
      if(fol.miniatureID === id) {
        this.openRemoveErrorModal();
      } else {
        this.pictureService.deletePicture(id).subscribe(list => {
          this.refresh();
        });
      }
    });
  }

  // Methods for file upload
  public clearEventHandler(e: ClearEvent): void {
    console.log("Clearing the file upload");
    this.imagePreviews = [];
  }

  public completeEventHandler() {
    console.log(`All files processed`);
    this.newPicture.url = "../../assets/img/" + this.imagePreviews[0].name;
  }

  public removeEventHandler(e: RemoveEvent): void {
    console.log(`Removing ${e.files[0].name}`);

    let index = this.imagePreviews.findIndex(item => item.uid === e.files[0].uid);

    if (index >= 0) {
      this.imagePreviews.splice(index, 1);
    }
  }

  public selectEventHandler(e: SelectEvent): void {
    let that = this;
    e.files.forEach((file) => {
      console.log(`File selected: ${file.name}`);

      if (!file.validationErrors) {
        let reader = new FileReader();

        reader.onload = function (ev) {
          let image = {
            name: file.name,
            uid: file.uid
          };

          that.imagePreviews.unshift(image);
        };

        reader.readAsDataURL(file.rawFile);
      }
    });
  }

}
