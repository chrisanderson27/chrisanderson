import { Component, OnInit, AfterViewInit, AfterViewChecked, Input } from '@angular/core';
import { ColorSwitchComponent } from './color-switch/color-switch.component';
import { MatDialog } from '@angular/material';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SpaceGameComponent } from './space-game/space-game.component';
import { FlashChatComponent } from './flash-chat/flash-chat.component';
import { SceneKitComponent } from './scene-kit/scene-kit.component';
import { transition, trigger, query, style, stagger, animate, keyframes, sequence } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mobileProjects } from 'src/app/Models/Projects';
export const ROUTE_ANIMATIONS_ELEMENTS = 'route-animations-elements';
@Component({
  selector: 'app-mobile-projects',
  templateUrl: './mobile-projects.component.html',
  styleUrls: ['./mobile-projects.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('*<=>*', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-200px)' }),
          stagger(100, [
            animate('500ms 400ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' }))
          ])
        ], {optional: true}),
        // query(':leave', [
        //   style({ opacity: 1, transform: 'none' }),
        //   stagger(-100, [
        //     animate('10ms cubic-bezier(0.35, 0, 0.25, 1)',
        //       style({ opacity: 0, transform: 'translateY(+200px)' }))
        //   ])
        // ])
      ])
    ]),
  ]

})
export class MobileProjectsComponent implements OnInit {
  projects;


  constructor(private dialog: MatDialog, private service: SourceCodeService) { 
    this.service.currentProjectView.subscribe(projects => this.projects = projects);

  }

  ngOnInit() {
  }

  addProjects() {
    // this.projects = mobileProjects;
  }

  openDialog(component: string) {
    const styles = {
      maxWidth: '100vw',
      width: '80%',
      maxHeight: '100vh',
    };

    let dialogRef = null;
    switch (component) {
      case 'ColorSwitch': dialogRef = this.dialog.open(ColorSwitchComponent, styles);
        break;
      case 'Todo': dialogRef = this.dialog.open(TodoListComponent, styles);
        break;
      case 'space': dialogRef = this.dialog.open(SpaceGameComponent, styles);
        break;
      case 'chat': dialogRef = this.dialog.open(FlashChatComponent, styles);
        break;
      case 'sceneKit': dialogRef = this.dialog.open(SceneKitComponent, styles);
        break;
      default: dialogRef = this.dialog.open(ColorSwitchComponent, styles);
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
