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
  CategoryTableViewController: string = code.todoList.CategoryTableViewController;
  SwipeTableViewController: string = code.todoList.SwipeTableViewController;
  TodoListViewController: string = code.todoList.TodoListViewController;

  sourceCode = [
    ['CategoryTableViewController.swift', this.CategoryTableViewController],
    ['SwipeTableViewController.swift', this.SwipeTableViewController],
    ['TodoListViewController.swift', this.TodoListViewController]];
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
