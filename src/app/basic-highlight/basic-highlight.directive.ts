import {
  Directive,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appBasicHighlight]',
})
export class BasicHighlightDirective implements OnInit {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    console.log(this.elementRef);
    // this.elementRef.nativeElement.style.backgroundColor = "green";
    // this.elementRef.nativeElement.style.border = "solid red";
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'blue'
    );
  }

  @HostListener('mouseenter') test() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'green'
    );
  }

  @HostListener('mouseleave') mouseleave() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-color',
      'yellow'
    );
  }
}
