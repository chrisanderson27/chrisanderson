import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageSelectorComponent } from './Components/Layout/project-view-container/other-projects/image-selector/image-selector.component';
import { MatGridListModule } from '@angular/material/grid-list';
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
import { HqtrackerComponent } from './Components/Layout/project-view-container/other-projects/hqtracker/hqtracker.component';
import { WeatherComponent } from './Components/Weather/weather/weather.component';
import { WeatherService } from './Components/Weather/weather.service';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ForecastComponent } from './Components/Weather/weather/forecast/forecast.component';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material';
import { AboutComponent } from './Components/Layout/about/about.component';
import { ContactComponent } from './Components/Layout/contact/contact.component';
import { ResumeComponent } from './Components/resume/resume.component';
import { SpaceGameComponent } from './Components/Layout/project-view-container/mobile-projects/space-game/space-game.component';
import { FlashChatComponent } from './Components/Layout/project-view-container/mobile-projects/flash-chat/flash-chat.component';
import { SceneKitComponent } from './Components/Layout/project-view-container/mobile-projects/scene-kit/scene-kit.component';
import { SimpleStickiesComponent } from './Components/Layout/project-view-container/other-projects/simple-stickies/simple-stickies.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TimeSlotsComponent } from './Components/Layout/project-view-container/other-projects/time-slots/time-slots.component';
import { TrainComponent } from './Components/Layout/project-view-container/full-stack-projects/projects/train/train.component';
import { ChatAppComponent } from './Components/Layout/project-view-container/other-projects/chat-app/chat-app.component';


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
    CloseModalButtonComponent,
    HqtrackerComponent,
    WeatherComponent,
    ForecastComponent,
    AboutComponent,
    ContactComponent,
    ResumeComponent,
    SpaceGameComponent,
    FlashChatComponent,
    SceneKitComponent,
    SimpleStickiesComponent,
    TimeSlotsComponent,
    TrainComponent,
    ChatAppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    MatGridListModule,
    MatTabsModule,
    MatDialogModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    ScrollingModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyByOL2s_W8D2DqK4n-ebIzCfnx95oLmqkk",
      authDomain: "simplestickies-2b370.firebaseapp.com",
      databaseURL: "https://simplestickies-2b370.firebaseio.com",
      projectId: "simplestickies-2b370",
      storageBucket: "simplestickies-2b370.appspot.com",
      messagingSenderId: "812842566199"
    }),
    AngularFirestoreModule,
    NgbModule.forRoot()
  ],
  providers: [
    SourceCodeService,
    WeatherService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ImageSelectorComponent,
    SourceCodeViewComponent,
    ColorSwitchComponent,
    TodoListComponent,
    HqtrackerComponent,
    WeatherComponent,
    ForecastComponent,
    ResumeComponent,
    FlashChatComponent,
    SpaceGameComponent,
    SceneKitComponent,
    SimpleStickiesComponent,
    TimeSlotsComponent,
    TrainComponent,
    ChatAppComponent
  ]
})
export class AppModule { }
