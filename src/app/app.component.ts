import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'Platzfinder';

  public isMobileLayout: boolean;

  ngOnInit() {

    this.isMobileLayout = window.innerWidth <= 991;
    window.onresize = () => this.isMobileLayout = window.innerWidth <= 991;
  }

}
