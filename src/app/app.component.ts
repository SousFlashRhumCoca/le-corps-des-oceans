import { Component, isDevMode } from '@angular/core';
import { NgtCanvas } from 'angular-three';

import {RouterLink, RouterOutlet} from '@angular/router';
import {AnatomyComponent} from './anatomy/anatomy.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav>
        <a routerLink="/Anatomy">Experience</a>
        <a routerLink="/Meteo">Meteo</a>
    </nav>
    <router-outlet></router-outlet>
    
  `,
  host: { class: 'block h-dvh w-full' },
  imports: [NgtCanvas, RouterOutlet, RouterLink],
})
export class AppComponent {
  sceneGraph = AnatomyComponent;
}
