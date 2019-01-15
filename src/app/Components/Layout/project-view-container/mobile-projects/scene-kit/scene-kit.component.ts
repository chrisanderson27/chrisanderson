import { Component, OnInit } from '@angular/core';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { MatDialog } from '@angular/material';
import { code } from 'src/app/Models/SourceCode.model';

@Component({
  selector: 'app-scene-kit',
  templateUrl: './scene-kit.component.html',
  styleUrls: ['./scene-kit.component.css']
})
export class SceneKitComponent implements OnInit {

  GameSceneViewController: string = code.sceneKit.game;

  sourceCode = [
    ['GameSceneViewController.swift', this.GameSceneViewController],];
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
