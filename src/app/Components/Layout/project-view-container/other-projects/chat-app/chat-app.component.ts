import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { code } from 'src/app/Models/SourceCode.model';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit {

  sourceCode = [
    ['chat-app.component.html', code.chatApp.html],
    ['chat-app.component.css', code.chatApp.css],
    ['chat-app.component.ts', code.chatApp.ts]];

  constructor(private dialog: MatDialog, private service: SourceCodeService) {
    service.currentSourceCode = this.sourceCode;

  }

  ngOnInit() {
  }

  //opens modal
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
