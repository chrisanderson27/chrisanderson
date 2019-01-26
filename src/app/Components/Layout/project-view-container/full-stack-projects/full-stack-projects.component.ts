import { Component, OnInit } from '@angular/core';
import { transition, trigger, query, style, stagger, animate, keyframes } from '@angular/animations';
import { MatDialog } from '@angular/material';
import { SourceCodeService } from 'src/app/Services/source-code.service';


@Component({
  selector: 'app-full-stack-projects',
  templateUrl: './full-stack-projects.component.html',
  styleUrls: ['./full-stack-projects.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('*<=>*', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-100px)' }),
          stagger(100, [
            animate('500ms 400ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'none' }))
          ])
        ], {optional: true})
      ])
    ]),
  ]
})
export class FullStackProjectsComponent implements OnInit {

  projects;
  constructor(private dialog: MatDialog, private service: SourceCodeService) {
    this.service.currentProjectView.subscribe(projects => this.projects = projects);
  }

  ngOnInit() {
  }

  openDialog(componentName: string) {
    const styles = {
      maxWidth: '85vw',
      maxHeight: '85vh',
    };

    let dialogRef = null;
    // switch (componentName) {
    //   case 'imageSelector': dialogRef = this.dialog.open(ImageSelectorComponent, styles);
    //     break;
    //   case 'hqTracker': dialogRef = this.dialog.open(HqtrackerComponent, styles);
    //     break;
    //   case 'timeSlots': dialogRef = this.dialog.open(TimeSlotsComponent, styles);
    //     break;
    //   case 'stickies': dialogRef = this.dialog.open(SimpleStickiesComponent, {
    //     maxWidth: '100vw',
    //     maxHeight: '100vh',
    //     width: '95%',
    //     height: '95%'
    //   });
    //     break;
    //   case 'weather': dialogRef = this.dialog.open(WeatherComponent, {
    //     maxWidth: '100vw',
    //     maxHeight: '100vh',
    //     width: '80%',
    //     height: '90%'
    //   });
    //     break;

    //   default: dialogRef = this.dialog.open(ImageSelectorComponent, styles);
    //     break;
    // }

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
