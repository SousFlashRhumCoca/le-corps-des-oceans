import {Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-soleil',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="sun">
      <div class="rays">
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
        <div class="ray"></div>
      </div>
    </div>
  `,
  styleUrl: './soleil.component.css'
})

export class SoleilComponent {  
  constructor() {
  }
}
