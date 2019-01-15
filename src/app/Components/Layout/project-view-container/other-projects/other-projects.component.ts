import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImageSelectorComponent } from './image-selector/image-selector.component';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { code } from 'src/app/Models/SourceCode.model';
import { HqtrackerComponent } from './hqtracker/hqtracker.component';
import { WeatherComponent } from 'src/app/Components/Weather/weather/weather.component';

@Component({
  selector: 'app-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.css']
})
export class OtherProjectsComponent implements OnInit {

  constructor(private dialog: MatDialog, private service: SourceCodeService) {
  }

  ngOnInit() {
  }

  openDialog(componentName: string) {
    const styles = {
      maxWidth: '85vw',
      maxHeight: '85vh',
    };

    let dialogRef = null;
    switch (componentName) {
      case 'imageSelector': dialogRef = this.dialog.open(ImageSelectorComponent, styles);
        break;
      case 'hqTracker': dialogRef = this.dialog.open(HqtrackerComponent, styles);
        break;
      case 'weather': dialogRef = this.dialog.open(WeatherComponent, {
        maxWidth: '100vw',
        maxHeight: '100vh',
        width: '80%',
        height: '90%'
      });
        break;

      default: dialogRef = this.dialog.open(ImageSelectorComponent, styles);
        break;
    }

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'dialog-content-example-dialog.html',
// })

// export class DialogContentExampleDialog {}