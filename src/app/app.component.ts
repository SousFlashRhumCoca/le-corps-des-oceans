import { Component } from '@angular/core';
import { NgtCanvas } from 'angular-three';
import { Experience } from './experience/experience.component';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav>
        <a routerLink="/Experience">Experience</a>
        <a routerLink="/Meteo">Meteo</a>
    </nav>
    <router-outlet></router-outlet>
    
  `,
  host: { class: 'block h-dvh w-full' },
  imports: [NgtCanvas, RouterOutlet, RouterLink],
})
export class AppComponent {
  sceneGraph = Experience;

}
