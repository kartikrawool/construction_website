import { Component, OnInit, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html',

  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
//styleUrls: ['./home.component.css'],