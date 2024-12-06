import {Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-pluie',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="raindrops" aria-hidden="true">
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
      <div class="raindrop">💧</div>
    </div>
  `,
  styleUrl: './pluie.component.css'
})

export class PluieComponent {  
  constructor() {
  }
}
