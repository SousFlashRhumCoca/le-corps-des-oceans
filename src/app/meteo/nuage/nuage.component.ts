import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-nuage',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  template: `
    <!-- src/app/meteo/nuage/nuage.component.html -->
    <div class="clouds">
      <div class="cloud"></div>
      <div class="cloud"></div>
      <div class="cloud"></div>
    </div>
  `,
  styleUrls: ['./nuage.component.css']
})
export class NuageComponent {

}
