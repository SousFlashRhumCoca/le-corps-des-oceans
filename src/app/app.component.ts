import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { Experience } from './experience/experience.component';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <ngt-canvas [sceneGraph]="sceneGraph" />
  `,
  host: { class: 'block h-dvh w-full' },
  imports: [NgtCanvas],
})
export class AppComponent {
  sceneGraph = Experience;
}
