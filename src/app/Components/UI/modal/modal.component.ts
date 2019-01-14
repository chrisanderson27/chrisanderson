import { Component, OnInit } from '@angular/core';
import { SourceCodeService } from 'src/app/Services/source-code.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  sourceCode;
  constructor(private service: SourceCodeService) { 
    this.sourceCode = service.currentSourceCode;
  }

  ngOnInit() {
  }

}
