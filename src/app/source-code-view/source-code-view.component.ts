import { Component, ViewContainerRef } from '@angular/core';
import { code } from '../Models/SourceCode.model';
import { SourceCodeService } from '../Services/source-code.service';

@Component({
  selector: 'app-source-code-view',
  templateUrl: './source-code-view.component.html',
  styleUrls: ['./source-code-view.component.css']
})

export class SourceCodeViewComponent {
  sourceCode;

  constructor(private service: SourceCodeService) {
    this.sourceCode = service.currentSourceCode;
  }
}
