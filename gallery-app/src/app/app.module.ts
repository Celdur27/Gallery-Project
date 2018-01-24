import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { UploadModule } from '@progress/kendo-angular-upload';

import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { AppComponent } from './app.component';
import { FolderComponent } from './folder/folder.component';
import { FolderDetailsComponent } from './folder-details/folder-details.component';

import { FolderService } from './folder.service';
import { PictureService } from './picture.service';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    FolderComponent,
    FolderDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    DialogModule,
    ButtonsModule,
    UploadModule
  ],
  providers: [FolderService, PictureService],
  bootstrap: [AppComponent]
})
export class AppModule { }
