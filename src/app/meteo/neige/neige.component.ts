import {Component } from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-neige',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="snowflakes" aria-hidden="true">
      <div class="snowflake, text-2xl">❅</div>
      <div class="snowflake text-2xl">❅</div>
      <div class="snowflake text-2xl">❆</div>
      <div class="snowflake text-2xl">❄</div>
      <div class="snowflake text-2xl">❅</div>
      <div class="snowflake text-2xl">❆</div>
      <div class="snowflake text-2xl">❅</div>
      <div class="snowflake text-2xl">❅</div>
      <div class="snowflake text-2xl">❆</div>
      <div class="snowflake text-2xl">❄</div>
      <div class="snowflake text-2xl">❅</div>
      <div class="snowflake text-2xl">❆</div>
      <div class="snowflake text-2xl">❅</div>
      <div class="snowflake text-2xl">❅</div>
      <div class="snowflake text-2xl">❆</div>
      <div class="snowflake text-2xl">❄</div>
      <div class="snowflake text-2xl">❅</div>
      <div class="snowflake text-2xl">❆</div>
    </div>
  `,
  styleUrl: './neige.component.css'
})

export class NeigeComponent {  
  constructor() {
  }
}
