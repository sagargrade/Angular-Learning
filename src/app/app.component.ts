import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  envName:string = '';

  constructor(){}

  ngOnInit(){
    this.envName = '';
    console.log('I am ngOnit');
  }

  onAnsReceived(event:string){
    console.log(event);
  }

  onSelectedPage(event:string){
    this.envName = event;
  }
}




















