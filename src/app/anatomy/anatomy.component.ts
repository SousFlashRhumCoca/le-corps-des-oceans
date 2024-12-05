import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    ElementRef,
    viewChild,
} from '@angular/core';
import { NgFor } from '@angular/common';
import {extend, injectStore, NgtArgs} from 'angular-three';
import {MTLLoader, OBJLoader, OrbitControls} from 'three-stdlib';
import { AmbientLight, DirectionalLight, Group, Object3D, Mesh, MeshBasicMaterial, SphereGeometry, Vector3, Clock, Euler } from 'three';

@Component({
    standalone: true,
    template: `
        <ngt-group #group>
            <ngt-orbit-controls *args="[camera(), glDomElement()]" />
            <ngt-grid-helper />

            <!-- The object will be dynamically inserted here -->

            <ngt-mesh
                *ngFor="let point of points"
                (click)="onSphereClick(point)"
                [position]="point.position"
                [scale]="0.1"
            >
                <ngt-sphere-geometry/>
                <ngt-mesh-basic-material [parameters]="{ color: 'red' }"/>
            </ngt-mesh>
        </ngt-group>
    `,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgtArgs, NgFor]
})
export class AnatomyComponent {
    private groupRef = viewChild.required<ElementRef<Group>>('group');

    private clock = new Clock();

    private mtlLoader = new MTLLoader();
    private objLoader = new OBJLoader();

    private store = injectStore();
    protected camera = this.store.select('camera');
    protected glDomElement = this.store.select('gl', 'domElement');

    points = [
        {
            position: [0.4, 3, 0.5],
            positionCamera: [1.5, 3, 3],
            rotationCamera: [0, 0, 0],
        },
        {
            position: [0, 0, 0.5],
            positionCamera: [1, 0, 2.5],
            rotationCamera: [0, 0, 0],
        },
        {
            position: [0, 2, -0.7],
            positionCamera: [1, 2, -3],
            rotationCamera: [0, Math.PI + 0.1, 0],
        },
    ]

    constructor() {
        extend({ Group, Object3D, AmbientLight, DirectionalLight, OrbitControls, Mesh, SphereGeometry, MeshBasicMaterial });

        this.mtlLoader.load('https://static.rullo.fr/anatomy.mtl', (materials) => {
            materials.preload();
            this.objLoader.setMaterials(materials);
            this.objLoader.load('https://static.rullo.fr/anatomy.obj', (object: Object3D) => {
                // Retrieve the group
                const group = this.groupRef().nativeElement;

                // Add the object to the group
                group.add(object);
                object.scale.set(6, 6, 6);
                object.position.set(0, -5, 0);

                // Add ambient light
                const ambientLight = new AmbientLight(0xffffff, 0.5);
                group.add(ambientLight);

                // Add directional light
                const directionalLight = new DirectionalLight(0xffffff, 1);
                directionalLight.position.set(5, 10, 7.5);
                group.add(directionalLight);

                this.camera().position.set(0, 0, 8);
            });
        });
    }

    zoomCamera(targetPosition: Vector3, targetRotation: Euler, duration: number) {
        const startPosition = this.camera().position.clone();
        const deltaPosition = targetPosition.clone().sub(startPosition);

        const startRotation = this.camera().rotation.clone();
        const deltaRotation = new Euler(
            targetRotation.x - startRotation.x,
            targetRotation.y - startRotation.y,
            targetRotation.z - startRotation.z
        );

        const startTime = performance.now();

        const animate = () => {
            const elapsedTime = (performance.now() - startTime) / 1000;
            const t = Math.min(elapsedTime / duration, 1);

            this.camera().position.copy(startPosition.clone().add(deltaPosition.clone().multiplyScalar(t)));
            this.camera().rotation.set(
                startRotation.x + deltaRotation.x * t,
                startRotation.y + deltaRotation.y * t,
                startRotation.z + deltaRotation.z * t
            );

            if (t < 1) {
                requestAnimationFrame(animate);
            }
        };

        animate();
    }

    resetCamera() {
        this.zoomCamera(new Vector3(0, 0, 8), new Euler(0, 0, 0), 2);
    }

    onSphereClick(point: typeof this.points[number]) {
        if (this.camera().position.equals(new Vector3(...point.positionCamera))) {
            this.resetCamera();
            return;
        }

        this.zoomCamera(new Vector3(...point.positionCamera), new Euler(...point.rotationCamera), 2);
    }
}
