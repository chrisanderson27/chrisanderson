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
import { SourceCodeViewComponent } from './source-code-view/source-code-view.component';
import { SourceCodeService } from './Services/source-code.service';
import { ColorSwitchComponent } from './Components/Layout/project-view-container/mobile-projects/color-switch/color-switch.component';
import { TodoListComponent } from './Components/Layout/project-view-container/mobile-projects/todo-list/todo-list.component';
import { ModalComponent } from './Components/UI/modal/modal.component';
import { CloseModalButtonComponent } from './Components/UI/close-modal-button/close-modal-button.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageSelectorComponent,
    VideoHeaderComponent,
    ProjectViewComponent,
    ProjectViewContainerComponent,
    MobileProjectsComponent,
    FullStackProjectsComponent,
    OtherProjectsComponent,
    SourceCodeViewComponent,
    ColorSwitchComponent,
    TodoListComponent,
    ModalComponent,
    CloseModalButtonComponent
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
  providers: [
    SourceCodeService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ImageSelectorComponent,
    SourceCodeViewComponent,
    ColorSwitchComponent
  ]
})
export class AppModule { }
