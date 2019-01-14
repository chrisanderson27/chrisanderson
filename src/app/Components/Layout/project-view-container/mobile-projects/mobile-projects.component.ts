import { Component, OnInit } from '@angular/core';
import { ColorSwitchComponent } from './color-switch/color-switch.component';
import { MatDialog } from '@angular/material';
import { SourceCodeService } from 'src/app/Services/source-code.service';

@Component({
  selector: 'app-mobile-projects',
  templateUrl: './mobile-projects.component.html',
  styleUrls: ['./mobile-projects.component.css']
})
export class MobileProjectsComponent implements OnInit {

  constructor(private dialog: MatDialog, private sourceCodeService: SourceCodeService) { }

  ngOnInit() {
  }
  openDialog(component: string) {
    const styles = {
      maxWidth: '100vw',
      width: '80%',
      maxHeight: '100vh',
    };

    let dialogRef = this.dialog.open(ColorSwitchComponent, styles);
    switch (component) {
      case 'ColorSwitch': dialogRef = this.dialog.open(ColorSwitchComponent, styles);
        break;

      default:
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
