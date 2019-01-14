import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  close() {
    this.dialog.closeAll();
  }

}
