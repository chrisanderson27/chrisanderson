import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { code } from 'src/app/Models/SourceCode.model';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';

@Component({
  selector: 'app-color-switch',
  templateUrl: './color-switch.component.html',
  styleUrls: ['./color-switch.component.css']
})
export class ColorSwitchComponent implements OnInit {
  gameScene: string = code.colorSwitch.gameScene;
  menuScene: string = code.colorSwitch.menuScene;

  sourceCode = [['GameScene.swift', this.gameScene],['MenuScene.swift', this.menuScene]];

  constructor(private dialog: MatDialog, private sourceCodeService: SourceCodeService) {
    sourceCodeService.currentSourceCode = this.sourceCode;
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
