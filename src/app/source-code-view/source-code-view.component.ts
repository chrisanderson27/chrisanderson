import { Component, ViewContainerRef } from '@angular/core';
import { code } from '../Models/SourceCode.model';

@Component({
  selector: 'app-source-code-view',
  templateUrl: './source-code-view.component.html',
  styleUrls: ['./source-code-view.component.css']
})
export class SourceCodeViewComponent {


html: string = code["captcha"]["html"];
css: string = code.captcha.css;
ts: string = code.captcha.ts;

  constructor(private view: ViewContainerRef) { }
}
