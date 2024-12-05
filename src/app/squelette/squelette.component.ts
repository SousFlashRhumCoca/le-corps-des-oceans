import { Component } from '@angular/core';
import {AnatomyComponent} from '../anatomy/anatomy.component';
import {NgtCanvas} from 'angular-three';

@Component({
  selector: 'app-squelette',
  standalone: true,
  imports: [NgtCanvas],
  template: `
    <ngt-canvas [sceneGraph]="sceneGraph" />
  `,
  styles: ``
})
export class SqueletteComponent {
  sceneGraph = AnatomyComponent;


}
