import {
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit, OnChanges, OnDestroy{
  @Input() nameEnv: string = '';
  @Output() myAnswer = new EventEmitter<string>();
  @ViewChild('userName') userNameDef: any;

  users = ['Ram', 'Ramesh', 'Suresh', 'Raju', 'Kishore', 'Rahul', 'Narendra'];

  constructor(private myElement: ElementRef) {}

  ngOnInit(): void {}

  ngOnChanges(){
    console.log('I am ngOnChanges')
  }

  ngOnDestroy(){
    console.log('I am ngOnDestroy');
  }

  onClickButton() {
    // this.myAnswer.emit('I am test component');
    // console.log(this.userNameDef);
  }
}
