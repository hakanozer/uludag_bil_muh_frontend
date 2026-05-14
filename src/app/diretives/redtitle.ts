import {
  Directive,
  ElementRef,
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appRedtitle]',
  standalone: true
})
export class Redtitle implements AfterViewInit {

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    const text = element.innerText;
    const h2 = document.createElement('h2');
    h2.textContent = text;
    // h2.style.color = 'red';
    // add class danger to h2 element
    h2.classList.add('text-danger');
    element.parentNode.replaceChild(h2, element);
  }

}