import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.css']
})
export class VideoHeaderComponent implements OnInit {
  fragment;
  constructor(private route: ActivatedRoute) { 
    this.fragment = route.fragment;
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
  }

  scrollToId(id: string) {
    document.getElementById(id).scrollIntoView(true);
  }

}
