import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDialogModule} from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageSelectorComponent } from './Components/Layout/project-view-container/other-projects/image-selector/image-selector.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { VideoHeaderComponent } from './Components/Layout/video-header/video-header.component';
import { ProjectViewComponent } from './Components/Layout/project-view/project-view.component';
import { ProjectViewContainerComponent } from './Components/Layout/project-view-container/project-view-container.component';
import { MobileProjectsComponent } from './Components/Layout/project-view-container/mobile-projects/mobile-projects.component';
import { FullStackProjectsComponent } from './Components/Layout/project-view-container/full-stack-projects/full-stack-projects.component';
import { OtherProjectsComponent } from './Components/Layout/project-view-container/other-projects/other-projects.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageSelectorComponent,
    VideoHeaderComponent,
    ProjectViewComponent,
    ProjectViewContainerComponent,
    MobileProjectsComponent,
    FullStackProjectsComponent,
    OtherProjectsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    ImageSelectorComponent
  ]
})
export class AppModule { }
