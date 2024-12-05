import {Component, isDevMode} from '@angular/core';
import {NgtCanvas} from 'angular-three';
import {Experience} from './experience/experience.component';

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
    <ngt-canvas [sceneGraph]="sceneGraph"/>
  `,
  host: {class: 'block h-dvh w-full'},
  imports: [NgtCanvas],
})
export class AppComponent {
  sceneGraph = Experience;
}
