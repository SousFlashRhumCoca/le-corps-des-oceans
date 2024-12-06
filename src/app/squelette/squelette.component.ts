import { Component } from '@angular/core';
import {AnatomyComponent} from '../anatomy/anatomy.component';
import {NgtCanvas} from 'angular-three';

@Component({
  selector: 'app-squelette',
  standalone: true,
  imports: [NgtCanvas],
  template: `
    <ngt-canvas [sceneGraph]="sceneGraph" />
    <div class="absolute text-gray-500 p-5 left-3 bottom-3 rounded bg-white bg-opacity-50 pointer-events-none">
      <ul class="list-disc list-inside dark:text-gray-400">
        <li>https://sketchfab.com/3d-models/splanchnology-5cfafb312f504815aa3fec55735607a6</li>
        <li>https://sketchfab.com/3d-models/water-waves-142c2596d1944cd0bf4fc1f490c4c248</li>
      </ul>
    </div>
  `,
  styles: `
    ngt-canvas {
      background: skyblue;
    }
  `
})
export class SqueletteComponent {
  sceneGraph = AnatomyComponent;


}
