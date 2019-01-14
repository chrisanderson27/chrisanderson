import { Component, OnInit } from '@angular/core';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { MatDialog } from '@angular/material';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { code } from 'src/app/Models/SourceCode.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  gameScene: string = "code code code!!!";
  menuScene: string = "code.todo.scene1 code!";

  sourceCode = [['todo1.swift', this.gameScene],['todo2.swift', this.menuScene]];
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

}
