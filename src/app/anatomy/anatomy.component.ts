import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    viewChild,
} from '@angular/core';
import { extend } from 'angular-three';
import { AmbientLight, DirectionalLight, Group, Object3D } from 'three';
import { MTLLoader, OBJLoader } from 'three-stdlib';

@Component({
    standalone: true,
    template: `
        <ngt-group #group>
            <!-- The object will be dynamically inserted here -->
        </ngt-group>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnatomyComponent {
    private groupRef = viewChild.required<ElementRef<Group>>('group');

    private mtlLoader = new MTLLoader();
    private objLoader = new OBJLoader();

    constructor() {
        extend({ Group, Object3D, AmbientLight, DirectionalLight });

        this.mtlLoader.load('anatomy.mtl', (materials) => {
            materials.preload();
            this.objLoader.setMaterials(materials);
            this.objLoader.load('anatomy.obj', (object: Object3D) => {
                // Retrieve the group
                const group = this.groupRef().nativeElement;

                // Center the object

                // Add the object to the group
                group.add(object);
                object.scale.set(15, 15, 15);
                object.position.set(0, -12, 2);

                // Add ambient light
                const ambientLight = new AmbientLight(0xffffff, 0.5);
                group.add(ambientLight);

                // Add directional light
                const directionalLight = new DirectionalLight(0xffffff, 1);
                directionalLight.position.set(5, 10, 7.5);
                group.add(directionalLight);
            });
        });
    }
}
