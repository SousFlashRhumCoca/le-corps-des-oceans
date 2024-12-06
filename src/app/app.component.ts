import { Component, isDevMode } from '@angular/core';
import { NgtCanvas } from 'angular-three';

import {RouterLink, RouterOutlet} from '@angular/router';
import {AnatomyComponent} from './anatomy/anatomy.component';

import {H} from 'highlight.run';

if (!isDevMode()) {
  H.init('jgo9vv6g', {
    environment: 'production',
    networkRecording: {
      enabled: true,
      recordHeadersAndBody: true,
      urlBlocklist: [
        // TODO: insert full or partial urls that you don't want to record here
      ],
    },
  });
}

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <router-outlet></router-outlet>
    
  `,
  host: { class: 'block h-dvh w-full' },
  imports: [NgtCanvas, RouterOutlet, RouterLink],
})
export class AppComponent {
  sceneGraph = AnatomyComponent;
}
