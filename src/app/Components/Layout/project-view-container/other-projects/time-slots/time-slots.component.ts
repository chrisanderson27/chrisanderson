import { Component, OnInit } from '@angular/core';
import { code } from 'src/app/Models/SourceCode.model';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { MatDialog } from '@angular/material';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';

@Component({
  selector: 'app-time-slots',
  templateUrl: './time-slots.component.html',
  styleUrls: ['./time-slots.component.css']
})
export class TimeSlotsComponent implements OnInit {

  sourceCode = [
    ['captcha.html', code.captcha.html],
    ['captcha.css', code.captcha.css],
    ['captcha-module.ts', code.captcha.ts]];

  constructor(private dialog: MatDialog, private service: SourceCodeService) {
    service.currentSourceCode = this.sourceCode;
  }

  ngOnInit() {
  }

  openDialog() {
    const dialogRef = this.dialog.open(SourceCodeViewComponent, {
      maxWidth: '100vw',
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
