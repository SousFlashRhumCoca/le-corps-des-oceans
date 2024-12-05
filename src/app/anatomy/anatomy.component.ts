import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    viewChild,
} from '@angular/core';
import {extend, injectStore, NgtArgs} from 'angular-three';
import { AmbientLight, DirectionalLight, Group, Object3D } from 'three';
import {MTLLoader, OBJLoader, OrbitControls} from 'three-stdlib';

@Component({
    standalone: true,
    template: `
        <ngt-group #group>
            <ngt-orbit-controls *args="[camera(), glDomElement()]" />
            <ngt-grid-helper />

            <!-- The object will be dynamically inserted here -->
        </ngt-group>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgtArgs]
})
export class AnatomyComponent {
    private groupRef = viewChild.required<ElementRef<Group>>('group');

    private mtlLoader = new MTLLoader();
    private objLoader = new OBJLoader();

    private store = injectStore();
    protected camera = this.store.select('camera');
    protected glDomElement = this.store.select('gl', 'domElement');

    constructor() {
        extend({ Group, Object3D, AmbientLight, DirectionalLight, OrbitControls });

        this.mtlLoader.load('anatomy.mtl', (materials) => {
            materials.preload();
            this.objLoader.setMaterials(materials);
            this.objLoader.load('anatomy.obj', (object: Object3D) => {
                // Retrieve the group
                const group = this.groupRef().nativeElement;

                // Add the object to the group
                group.add(object);
                object.scale.set(6, 6, 6);
                object.position.set(0, -5, -4);

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
