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
      <div class="cloud">
        <svg fill="#000000" height="800px" width="800px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
             xmlns:xlink="http://www.w3.org/1999/xlink"
             viewBox="0 0 512.001 512.001" xml:space="preserve">
<g>
<g>
<path d="M344.381,143.771C254.765,56.017,102.37,103.776,79.825,227.7c-31.849,4.598-59.138,25.445-72.018,55.076
tc-0.016,0.035-0.032,0.07-0.047,0.107c-26.687,61.602,18.784,130.232,85.51,130.232h282.267
tc75.246,0,136.463-61.216,136.463-136.462C512,189.241,430.314,123.682,344.381,143.771z M375.537,381.12H93.271
tc-69.246,0-84.534-98.263-18.714-119.456c14.753-4.65,43.01-7.348,74.38,21.892c6.464,6.024,16.586,5.667,22.61-0.794
tc6.024-6.464,5.668-16.586-0.794-22.61c-17.93-16.712-38.071-27.33-58.484-31.453c22.034-99.077,147.374-131.851,215.247-56.305
tc4.189,4.661,10.714,6.451,16.693,4.57c67.272-21.117,135.795,29.374,135.795,99.69
tC480.005,334.256,433.141,381.12,375.537,381.12z"/>
</g>
</g>
</svg>
      </div>
      <div class="cloud"></div>
    </div>
  `,
  styleUrls: ['./nuage.component.css']
})
export class NuageComponent {

}
