import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageSelectorComponent } from './Components/Layout/project-view-container/other-projects/image-selector/image-selector.component';
import { ForecastComponent } from './Components/Weather/weather/forecast/forecast.component';
const routes: Routes = [
  {
    path: 'imageSelector',
    component: ImageSelectorComponent
  },
  {
    path: 'forcast',
    component: ForecastComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
