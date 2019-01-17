import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { transition, trigger, query, style, stagger, animate, keyframes } from '@angular/animations';
import { VideoHeaderComponent } from './Components/Layout/video-header/video-header.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('*<=>*', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(100, [
            animate('1000ms 1000ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' }))
          ])
        ])
      ])
    ]),
  ]
})
export class AppComponent {
  title = 'refactoring...';
  isShown = true;
  components = [VideoHeaderComponent];
  constructor(public dialog: MatDialog) {
    console.log(VideoHeaderComponent);

  }

}


