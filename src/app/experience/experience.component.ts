import {DOCUMENT} from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    Directive,
    ElementRef,
    inject,
    viewChild,
} from '@angular/core';
import {extend, injectBeforeRender} from 'angular-three';
import {Group, Object3D} from 'three';
import {OBJLoader} from 'three/addons/loaders/OBJLoader.js';
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

    loader = new GLTFLoader();

    constructor() {
        // Étendre les classes nécessaires à Three.js
        extend({Group, Object3D});

        // Charger le fichier OBJ
        this.loader.load('Splanchnology.glb', (object) => {
            // Récupérer le groupe
            const group = this.groupRef().nativeElement as Group;

            // Ajouter l'objet au groupe
            group.add(object.scene);
            object.scene.scale.set(2, 2, 2);
        });

        // Faire tourner le groupe continuellement
        injectBeforeRender(({delta}) => {
            const group = this.groupRef().nativeElement as Group;
            group.rotation.y += delta;
        });
    }
}
