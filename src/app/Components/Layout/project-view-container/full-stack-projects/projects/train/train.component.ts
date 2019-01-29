import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit {

  sourceCode = [
    [
      'file1.java', '1234'
    ]
  ];

  constructor(private dialog: MatDialog, private service: SourceCodeService) {
    service.currentSourceCode = this.sourceCode;
  }
  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SourceCodeViewComponent, {
      // maxWidth: '100vw',
      width: '80%',
      maxHeight: '100vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  close() {
    this.dialog.closeAll();
  }

}
