import { Component } from '@angular/core';

@Component({
  selector: 'app-prod',
  templateUrl: './prod.component.html',
  styleUrls: ['./prod.component.css'],
})
export class ProdComponent {
  users = ['Ram', 'Ramesh', 'Suresh', 'Raju', 'Kishore', 'Rahul', 'Narendra'];
  constructor(){}
}

