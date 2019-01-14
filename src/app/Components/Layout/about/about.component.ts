import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ResumeComponent } from '../../resume/resume.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(ResumeComponent, {
      maxWidth: '100vw',
      width: '80%',
      maxHeight: '100vh',
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  close() {
    this.dialog.closeAll();
  }

}
