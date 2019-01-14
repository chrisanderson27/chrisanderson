import { Component, OnInit } from '@angular/core';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { MatDialog } from '@angular/material';
import { code } from 'src/app/Models/SourceCode.model';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';

@Component({
  selector: 'app-hqtracker',
  templateUrl: './hqtracker.component.html',
  styleUrls: ['./hqtracker.component.css']
})
export class HqtrackerComponent implements OnInit {
  GoogleScraper: string = code.HQtracker.GoogleScraper;
  ScreenData: string = code.HQtracker.ScreenData;
  TextRegions: string = code.HQtracker.TextRegions;
  colorChangeChecker: string = code.HQtracker.colorChangeChecker;
  Driver: string = code.HQtracker.Driver;

  

  sourceCode = [
    ['GoogleScraper.java', this.GoogleScraper],
    ['ScreenData.java', this.ScreenData],
    ['TextRegions.java', this.TextRegions],
    ['colorChangeChecker.java', this.colorChangeChecker],
    ['Driver.java', this.Driver]];
    
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
