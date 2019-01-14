import { Component, OnInit } from '@angular/core';
import { ColorSwitchComponent } from './color-switch/color-switch.component';
import { MatDialog } from '@angular/material';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { TodoListComponent } from './todo-list/todo-list.component';

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

    let dialogRef = null;
    switch (component) {
      case 'ColorSwitch': dialogRef = this.dialog.open(ColorSwitchComponent, styles);
        break;
      case 'Todo': dialogRef = this.dialog.open(TodoListComponent, styles);
        break;
      default: dialogRef = this.dialog.open(ColorSwitchComponent, styles);
        break;
    }
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
