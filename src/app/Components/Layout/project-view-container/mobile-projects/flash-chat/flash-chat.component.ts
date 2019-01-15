import { Component, OnInit } from '@angular/core';
import { SourceCodeViewComponent } from 'src/app/source-code-view/source-code-view.component';
import { SourceCodeService } from 'src/app/Services/source-code.service';
import { MatDialog } from '@angular/material';
import { code } from 'src/app/Models/SourceCode.model';

@Component({
  selector: 'app-flash-chat',
  templateUrl: './flash-chat.component.html',
  styleUrls: ['./flash-chat.component.css']
})
export class FlashChatComponent implements OnInit {

  RegisterViewController: string = code.flashChat.register;
  LoginViewController: string = code.flashChat.login;
  ChatViewController: string = code.flashChat.chat;
 

  sourceCode = [
    ['RegisterViewController.swift', this.RegisterViewController],
    ['LoginViewController.swift', this.LoginViewController],
    ['ChatViewController.swift', this.ChatViewController],
  ];
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
