import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ImageSelectorComponent } from './image-selector/image-selector.component';

@Component({
  selector: 'app-other-projects',
  templateUrl: './other-projects.component.html',
  styleUrls: ['./other-projects.component.css']
})
export class OtherProjectsComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }


  openDialog() {
    const dialogRef = this.dialog.open(ImageSelectorComponent);

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