import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FolderComponent } from './folder/folder.component';
import { FolderDetailsComponent } from './folder-details/folder-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/folders', pathMatch: 'full' },
  { path: 'folders', component: FolderComponent },
  { path: 'folders/:id', component: FolderDetailsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
