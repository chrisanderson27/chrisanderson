import { Component, OnInit } from '@angular/core';
import { mobileProjects, webProjects } from 'src/app/Models/Projects';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { transition, trigger, query, style, stagger, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-project-view-container',
  templateUrl: './project-view-container.component.html',
  styleUrls: ['./project-view-container.component.css'],
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
    trigger('itemFallAnimation', [
      transition('*<=>*', [

        style({ opacity: 0, transform: 'translateY(-200px)' }),

        animate('1200ms 1000ms cubic-bezier(0.35, 0, 0.25, 1)',
          style({ opacity: 1, transform: 'none' })),
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
export class ProjectViewContainerComponent implements OnInit {
  parentMessage = mobileProjects;

  selectedProjectGroup: any;
  test = 'other';


  constructor(private service: SourceCodeService) { }

  ngOnInit() {
    this.service.currentProjectView.subscribe(selectedProjectGroup => this.selectedProjectGroup = selectedProjectGroup);
  }

  updateMessage($event) {
    console.log($event.tab.textLabel);
    switch ($event.tab.textLabel) {
      case 'Web based':
        console.log('inside web based');
        this.service.setProjectGroup(webProjects);
        this.test = 'other';
        break;
      case 'Mobile':
        console.log('inside')

        this.service.setProjectGroup(mobileProjects);
        this.test = 'mobile';


        break;
      case 'Full Stack':
        this.service.setProjectGroup("full");

        break;

      default:
        break;
    }
  }

}
