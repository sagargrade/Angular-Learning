import { Component, OnInit } from '@angular/core';
import { UserdataService } from './shared/userdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  envName:string = 'Welcome';

  constructor(){}

  ngOnInit(){ }

  onAnsReceived(event:string){
    console.log(event);
  }

  onSelectedPage(event:string){
    this.envName = event;
  }
}




















