import { Component, OnInit } from '@angular/core';
import { ColorSwitchComponent } from './color-switch/color-switch.component';
import { MatDialog } from '@angular/material';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SpaceGameComponent } from './space-game/space-game.component';
import { FlashChatComponent } from './flash-chat/flash-chat.component';
import { SceneKitComponent } from './scene-kit/scene-kit.component';
import { transition, trigger, query, style, stagger, animate, keyframes } from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { mobileProjects } from 'src/app/Models/Projects';

@Component({
  selector: 'app-mobile-projects',
  templateUrl: './mobile-projects.component.html',
  styleUrls: ['./mobile-projects.component.css'],
  animations: [
    trigger('listStagger', [
      transition('* <=> *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(-15px)' }),
            stagger(
              '50ms',
              animate(
                '550ms ease-out',
                style({ opacity: 1, transform: 'translateY(0px)' })
              )
            )
          ],
          { optional: true }
        ),
        query(':leave', animate('50ms', style({ opacity: 0 })), {
          optional: true
        })
      ])
    ])
  ]
  // animations: [
  //   trigger('cardAnimations', [
  //     transition('* => *', [
  //       query('img', style({ transform: 'translateY(-100%)' })),
  //       query('img',
  //         stagger('2000ms', [
  //           animate('2000ms', style({ transform: 'translateY(-100%)' }))
  //         ]))
  //     ])
  //   ])
  // ]
})
export class MobileProjectsComponent implements OnInit {

  projects = mobileProjects;

  constructor(private dialog: MatDialog, private sourceCodeService: SourceCodeService) { }

  ngOnInit() {
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
