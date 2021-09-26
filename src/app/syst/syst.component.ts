import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-syst',
  templateUrl: './syst.component.html',
  styleUrls: ['./syst.component.css'],
})
export class SystComponent implements OnInit {
  users = ['Ram', 'Ramesh', 'Suresh', 'Raju', 'Kishore', 'Rahul', 'Narendra'];

  constructor() {}

  ngOnInit(): void {}
}
