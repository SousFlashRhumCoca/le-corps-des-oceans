import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Directive,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { extend, injectBeforeRender } from 'angular-three';
import { AmbientLight, DirectionalLight, Group, Object3D } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

@Directive({
    selector: '[cursorPointer]',
    standalone: true,
})
export class CursorPointer {
    constructor() {
        const document = inject(DOCUMENT);
        const hostElement = inject<ElementRef<Group>>(ElementRef);
        const group = hostElement.nativeElement;

        if (!group) return;
    }
}

@Component({
    standalone: true,
    template: `
        <ngt-group #group cursorPointer>
            <!-- L'objet sera inséré ici dynamiquement -->
        </ngt-group>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CursorPointer],
})
export class Experience {
    private groupRef = viewChild.required<ElementRef<Group>>('group');

    private loader = new GLTFLoader();

    constructor() {
        // Étendre les classes nécessaires à Three.js
        extend({ Group, Object3D, AmbientLight, DirectionalLight });

        // Charger le fichier OBJ
        this.loader.load('Splanchnology.glb', (object) => {
            // Récupérer le groupe
            const group = this.groupRef().nativeElement;

            // Ajouter l'objet au groupe
            group.add(object.scene);
            object.scene.scale.set(2, 2, 2);

            // Ajouter de la lumière ambiante
            const ambientLight = new AmbientLight(0xffffff, 0.5);
            group.add(ambientLight);

            // Ajouter de la lumière directionnelle
            const directionalLight = new DirectionalLight(0xffffff, 1);
            directionalLight.position.set(5, 10, 7.5);
            group.add(directionalLight);
        });

        // Faire tourner le groupe continuellement
        injectBeforeRender(({ }) => {
            const group = this.groupRef().nativeElement;
            // group.rotation.y += 0.01;
        });
    }
}
