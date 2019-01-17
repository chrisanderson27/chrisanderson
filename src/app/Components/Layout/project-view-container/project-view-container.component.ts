import { Component, OnInit } from '@angular/core';
import { mobileProjects, webProjects } from 'src/app/Models/Projects';
import { SourceCodeService } from 'src/app/Services/source-code.service';

@Component({
  selector: 'app-project-view-container',
  templateUrl: './project-view-container.component.html',
  styleUrls: ['./project-view-container.component.css']
})
export class ProjectViewContainerComponent implements OnInit {
  parentMessage = mobileProjects;

  selectedProjectGroup: any;



  constructor(private service: SourceCodeService) { }

  ngOnInit() {
    this.service.currentProjectView.subscribe(selectedProjectGroup => this.selectedProjectGroup = selectedProjectGroup);
  }

  updateMessage($event) {
    console.log($event.tab.textLabel)
    switch ($event.tab.textLabel) {
      case 'Web based':
        console.log('inside web based')
        this.service.setProjectGroup(webProjects)

        break;
      case 'Mobile':
        console.log('inside ')

        this.service.setProjectGroup(mobileProjects)

        break;
      case 'Full Stack':
        this.service.setProjectGroup("full")

        break;

      default:
        break;
    }
  }

}
