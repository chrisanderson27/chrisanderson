import { Component, OnInit } from '@angular/core';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { MatDialog } from '@angular/material';
import { code } from 'src/app/Models/SourceCode.model';

@Component({
  selector: 'app-space-game',
  templateUrl: './space-game.component.html',
  styleUrls: ['./space-game.component.css']
})
export class SpaceGameComponent implements OnInit {

  empty: string = code.space.Empty;

  sourceCode = [
    ['', this.empty]];
  constructor(private service: SourceCodeService, private dialog: MatDialog) {
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
