import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageSelectorComponent } from './image-selector/image-selector.component';

const routes: Routes = [
  {
    path: 'imageSelector',
    component: ImageSelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
