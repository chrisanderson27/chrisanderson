import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-close-modal-button',
  templateUrl: './close-modal-button.component.html',
  styleUrls: ['./close-modal-button.component.css']
})
export class CloseModalButtonComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  close() {
    this.dialog.closeAll();
  }

}
