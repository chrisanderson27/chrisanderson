import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { webProjects } from '../Models/Projects';

@Injectable({
  providedIn: 'root'
})
export class SourceCodeService {
  currentSourceCode;

  // initial view
  private currentProjectSource = new BehaviorSubject(webProjects);

  currentProjectView = this.currentProjectSource.asObservable();

  setProjectGroup(projects: any) {
    this.currentProjectSource.next(projects);
  }

}
