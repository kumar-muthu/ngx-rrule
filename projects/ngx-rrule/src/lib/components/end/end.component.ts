import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent implements OnInit {
  public  frequency = 'Never';
  constructor() { }

  ngOnInit() {
  }

}
